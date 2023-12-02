using Aplicacao.DTOs;
using Aplicacao.Servicos.Dashboard;
using API.Servicos.ProcessarArquivos;
using Microsoft.AspNetCore.Mvc;
using Aplicacao.Servicos;
using Microsoft.Extensions.Caching.Memory;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlanilhaController : Controller
{
    IMemoryCache _cache;
    private readonly IGestaoPlanilhaService _planilhaService;
    private readonly ProcessarDados _processamento;
    private readonly DashboardService _dashboardService;

    public PlanilhaController(
        IMemoryCache cache,
        IGestaoPlanilhaService gestorPlanilha,
        ProcessarDados processamento,
        DashboardService dashboardService
        )
    {
        _cache = cache;
        _planilhaService = gestorPlanilha;
        _processamento = processamento;
        _dashboardService = dashboardService;
    }

    //TODO: Implementar filtro por planilha inserida e remover cache

    /// <summary>
    /// Importar planilha de pedidos e processar dados para salvar no banco de dados.
    /// </summary>
    /// <param name="planilha"></param>
    /// <returns>Um código HTTP com uma mensagem de sucesso ou falha no processamento dos dados</returns>
    [Consumes("multipart/form-data")]
    [HttpPost("ImportarPlanilha")]
    public async Task<ActionResult<PlanilhaDTO>> ImportarPlanilha(IFormFile planilha)
    {
        // Checar se arquivo existe e possui conteúdo
        if (planilha is null || planilha.Length == 0)
        {
            return BadRequest("Arquivo não fornecido corretamente.");
        }

        // Retornar lista de dados na planilha
        var listaPedidos = await _planilhaService.LerPedidos(planilha);

        // Salvar em cache para usar em outro local e otimizar geração de gráficos
        var cacheKey = "ultimaListaPedidos";
        _cache.Set(cacheKey, listaPedidos, TimeSpan.FromMinutes(10));

        var resultado = await _planilhaService.ProcessarPlanilha(listaPedidos, _processamento);

        return resultado.Successo ?
            Ok(listaPedidos) : BadRequest(resultado.Mensagem);
    }

    [HttpGet("ObterVendasPorRegiao")]
    public async Task<ActionResult<VendasRegiaoDTO>> ConsultarVendasPorRegiao()
    {
        return await ObterVendas(
            "ultimaListaPedidos", _dashboardService.ObterVendasPorRegiao
            );
    }

    [HttpGet("ObterVendasPorProduto")]
    public async Task<ActionResult<VendasProdutoDTO>> ConsultarVendasPorProduto()
    {
        return await ObterVendas(
            "ultimaListaPedidos", _dashboardService.ObterVendasPorProduto
            );
    }

    [HttpGet("ObterListaVendas")]
    public async Task<ActionResult<ListaVendasDTO>> ConsultarListaVendas()
    {
        return await ObterVendas(
            "ultimaListaPedidos", _dashboardService.ObterListaVendas
            );
    }
    private async Task<ActionResult> ObterVendas<T>(string cacheKey, Func<IEnumerable<PlanilhaDTO>, Task<T>> obterVendasFunc)
    {
        if (_cache.TryGetValue(cacheKey, out IEnumerable<PlanilhaDTO> listaPedidos))
        {
            var vendas = await obterVendasFunc(listaPedidos!);
            return Ok(vendas);
        }
        return NotFound("Lista de pedidos não encontrada, por favor, insira novamente.");
    }


}
