using API.Servicos.GestaoPlanilha;
using API.Servicos.Processamento;
using Aplicacao.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlanilhaController : Controller
{
    private readonly IProcessamentoService _processamentoService;
    private readonly IConfiguration _configuration;

    public PlanilhaController(
        IProcessamentoService processamentoService,
        IConfiguration configuration)
    {
        _processamentoService = processamentoService;
        _configuration = configuration;
    }

    [HttpGet("DownloadModeloPlanilha")]
    public IActionResult DownloadModeloPlanilha()
    {
        string caminhoModelo = _configuration["PlanilhaModelo:Caminho"];
        if (!System.IO.File.Exists(caminhoModelo))
        {
            return NotFound();
        }

        var stream = new FileStream(caminhoModelo, FileMode.Open, FileAccess.Read);
        return new FileStreamResult(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        {
            FileDownloadName = Path.GetFileName(caminhoModelo)
        };
    }

    [Consumes("multipart/form-data")]
    [HttpPost("ImportarPlanilha")]
    public async Task<ActionResult<ResultadoProcessamento>> ImportarPlanilha(IFormFile planilha)
    {
        return await _processamentoService.ImportarPlanilha(planilha);
    }

    [HttpGet("ObterVendasPorRegiao")]
    public async Task<IEnumerable<VendasRegiaoDTO>> ConsultarVendasPorRegiao()
    {
        return await _processamentoService.ObterVendasPorRegiao();
    }

    [HttpGet("ObterVendasPorProduto")]
    public async Task<IEnumerable<VendasProdutoDTO>> ConsultarVendasPorProduto()
    {
        return await _processamentoService.ObterVendasPorProduto();
    }

    [HttpGet("ObterListaVendas")]
    public async Task<List<ListaVendasDTO>> ConsultarListaVendas()
    {
        return await _processamentoService.ObterListaVendas();
    }
}
