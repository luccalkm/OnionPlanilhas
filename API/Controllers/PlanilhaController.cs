using Aplicacao.DTOs;
using Aplicacao.Persistencia;
using API.Servicos.ProcessarArquivos;
using Microsoft.AspNetCore.Mvc;
using Aplicacao.Servicos;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlanilhaController : Controller
{
    private readonly IGestaoPlanilhaService _gestorPlanilha;
    private readonly ProcessarDados _processamento;

    public PlanilhaController(
        IGestaoPlanilhaService gestorPlanilha,
        ProcessarDados processamento
        )
    {
        _gestorPlanilha = gestorPlanilha;
        _processamento = processamento;
    }

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
        var listaPedidos = await _gestorPlanilha.LerPedidos(planilha);

        var resultado = await _gestorPlanilha.ProcessarPlanilha(listaPedidos, _processamento);

        return resultado.Successo ? 
            Ok(resultado.Mensagem) : BadRequest(resultado.Mensagem);
    }

}
