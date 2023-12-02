using Aplicacao.DTOs;
using Aplicacao.Servicos.Frete;
using Aplicacao.Servicos.Integracao;
using Dominio;

namespace Aplicacao.Servicos.Dashboard
{
    public class DashboardService
    {
        private readonly FreteService _freteService;
        private readonly ViaCepService _viaCepService;

        public DashboardService(FreteService freteService, ViaCepService viaCepService)
        {
            _freteService = freteService;
            _viaCepService = viaCepService;
        }

        public async Task<List<VendasRegiaoDTO>> ObterVendasPorRegiao(IEnumerable<PlanilhaDTO> listaPedidos)
        {
            var ceps = listaPedidos.Select(p => p.CEP);
            var regioes = await ObterRegioesCepsAgrupados(ceps);

            var agrupamentoRegiao = listaPedidos.GroupBy(p => regioes[p.CEP].Nome)
                                                .ToDictionary(g => g.Key, g => g.Count());

            return agrupamentoRegiao.Select(r => new VendasRegiaoDTO { Regiao = r.Key, Quantidade = r.Value }).ToList();
        }

        public List<VendasProdutoDTO> ObterVendasPorProduto(IEnumerable<PlanilhaDTO> listaPedidos)
        {
            var agrupamentoProduto = listaPedidos.GroupBy(p => p.Produto)
                                                 .ToDictionary(g => g.Key, g => g.Count());

            return agrupamentoProduto.Select(r => new VendasProdutoDTO { Produto = r.Key, Quantidade = r.Value }).ToList();
        }

        public async Task<List<ListaVendasDTO>> ObterListaVendas(IEnumerable<PlanilhaDTO> listaPedidos)
        {
            var ceps = listaPedidos.Select(p => p.CEP);
            var regioes = await ObterRegioesCepsAgrupados(ceps);

            var listaVendas = new List<ListaVendasDTO>();
            foreach (var pedido in listaPedidos)
            {
                var regiao = regioes[pedido.CEP];
                var venda = new ListaVendasDTO
                {
                    Cliente = pedido.RazaoSocial,
                    Produto = pedido.Produto,
                    ValorTotal = await _freteService.CalcularPrecoComFrete(pedido.Produto, regiao),
                    DataEntrega = _freteService.CalcularTempoEntrega(pedido.Data, regiao),
                    Regiao = regiao.Nome
                };

                listaVendas.Add(venda);
            }
            return listaVendas;
        }

        private async Task<Dictionary<string, RegiaoDTO>> ObterRegioesCepsAgrupados(IEnumerable<string> ceps)
        {
            var regioes = new Dictionary<string, RegiaoDTO>();
            foreach (var cep in ceps.Distinct())
            {
                regioes[cep] = await _viaCepService.ObterRegiaoPorCep(cep);
            }
            return regioes;
        }
    }
}
