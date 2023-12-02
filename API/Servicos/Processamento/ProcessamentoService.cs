using API.Servicos.ProcessarArquivos;
using Aplicacao.Servicos.Dashboard;
using Aplicacao.Servicos;
using Aplicacao.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using API.Servicos.GestaoPlanilha;

namespace API.Servicos.Processamento;

public class ProcessamentoService : IProcessamentoService
{
    private readonly IMemoryCache _cache;
    private readonly IGestaoPlanilhaService _planilhaService;
    private readonly ProcessarDados _processamento;
    private readonly DashboardService _dashboardService;

    public ProcessamentoService(
        IMemoryCache cache,
        IGestaoPlanilhaService planilhaService,
        ProcessarDados processamento,
        DashboardService dashboardService)
    {
        _cache = cache;
        _planilhaService = planilhaService;
        _processamento = processamento;
        _dashboardService = dashboardService;
    }

    public async Task<ResultadoProcessamento> ImportarPlanilha(IFormFile planilha)
    {
        // Checar se arquivo existe e possui conteúdo
        if (planilha is null || planilha.Length == 0)
        {
            throw new ArgumentException("Arquivo da planilha não fornecido corretamente.");
        }

        // Retornar lista de dados na planilha
        var listaPedidos = await _planilhaService.LerPedidos(planilha);

        // Salvar em cache para usar em outro local e otimizar geração de gráficos
        var cacheKey = "ultimaListaPedidos";
        _cache.Set(cacheKey, listaPedidos, TimeSpan.FromMinutes(10));

        var resultado = await _planilhaService.ProcessarPlanilha(listaPedidos, _processamento);

        return resultado;
    }

    public async Task<IEnumerable<VendasRegiaoDTO>> ObterVendasPorRegiao()
    {
        if (_cache.TryGetValue("ultimaListaPedidos", out IEnumerable<PlanilhaDTO> listaPedidos))
        {
            return await _dashboardService.ObterVendasPorRegiao(listaPedidos);
        }
        throw new KeyNotFoundException("Lista de pedidos não encontrada no cache.");
    }

    public async Task<IEnumerable<VendasProdutoDTO>> ObterVendasPorProduto()
    {
        if (_cache.TryGetValue("ultimaListaPedidos", out IEnumerable<PlanilhaDTO> listaPedidos))
        {
            return _dashboardService.ObterVendasPorProduto(listaPedidos);
        }
        throw new KeyNotFoundException("Lista de pedidos não encontrada no cache.");
    }

    public async Task<List<ListaVendasDTO>> ObterListaVendas()
    {
        if (_cache.TryGetValue("ultimaListaPedidos", out IEnumerable<PlanilhaDTO> listaPedidos))
        {
            return await _dashboardService.ObterListaVendas(listaPedidos);
        }
        throw new KeyNotFoundException("Lista de pedidos não encontrada no cache.");
    }
}
