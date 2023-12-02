using Aplicacao.DTOs;
using Aplicacao.Servicos.Frete;
using Aplicacao.Servicos.Integracao;

namespace Aplicacao.Servicos.Dashboard;

public class DashboardService
{
    private readonly FreteService _freteService;
    private readonly ViaCepService _viaCepService;

    public DashboardService(FreteService freteService, ViaCepService viaCepService)
    {;
        _freteService = freteService;
        _viaCepService = viaCepService;
    }

    public async Task<List<VendasRegiaoDTO>> ObterVendasPorRegiao(IEnumerable<PlanilhaDTO> listaPedidos)
    {
        // Processar quantidade agrupando por CEP
        var vendasPorCep = new Dictionary<string, int>();
        foreach (var pedido in listaPedidos)
        {
            if (!vendasPorCep.ContainsKey(pedido.CEP))
            {
                vendasPorCep[pedido.CEP] = 0;
            }
            vendasPorCep[pedido.CEP]++;
        }

        var regioes = new Dictionary<string, string>(); // CEP -> Região
        var agrupamentoRegiao = new Dictionary<string, int>(); // Região -> Quantidade

        // Processar quantidade agrupando por Região
        foreach (var cep in vendasPorCep.Keys)
        {
            if (!regioes.ContainsKey(cep))
            {
                var regiao = await _viaCepService.ObterRegiaoPorCep(cep);
                regioes[cep] = regiao.Nome;
            }

            var regiaoNome = regioes[cep];
            if (!agrupamentoRegiao.ContainsKey(regiaoNome))
            {
                agrupamentoRegiao[regiaoNome] = 0;
            }
            agrupamentoRegiao[regiaoNome] += vendasPorCep[cep];
        }

        // Retornar lista de vendas por região
        return agrupamentoRegiao
            .Select(r => new VendasRegiaoDTO { Regiao = r.Key, Quantidade = r.Value })
            .ToList();
    }

    public async Task<List<VendasProdutoDTO>> ObterVendasPorProduto(IEnumerable<PlanilhaDTO> listaPedidos)
    {
        // Processar quantidade agrupando por produto
        var agrupamentoProduto = new Dictionary<string, int>();
        var vendasPorProduto = new List<VendasProdutoDTO>();

        // Processar quantidade por produto
        foreach(var pedido in listaPedidos)
        {
            if (!agrupamentoProduto.ContainsKey(pedido.Produto))
            {
                agrupamentoProduto[pedido.Produto] = 0;
            }
            agrupamentoProduto[pedido.Produto]++;
        }

        // Retornar lista de vendas por produto
        return agrupamentoProduto
            .Select(r => new VendasProdutoDTO { Produto = r.Key, Quantidade = r.Value })
            .ToList();
    }

    public async Task<List<ListaVendasDTO>> ObterListaVendas(IEnumerable<PlanilhaDTO> listaPedidos)
    {
        var listaVendas = new List<ListaVendasDTO>();
        foreach (var pedido in listaPedidos)
        {
            var regiao = await _viaCepService.ObterRegiaoPorCep(pedido.CEP);
            var venda = new ListaVendasDTO
            {
                Cliente = pedido.RazaoSocial,
                Produto = pedido.Produto,
                ValorTotal = await _freteService.CalcularPrecoComFrete(pedido.Produto, regiao),
                DataEntrega = _freteService.CalcularTempoEntrega(pedido.Data, regiao),
            };

            listaVendas.Add(venda);
        }
        return listaVendas;
    }

}
