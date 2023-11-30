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
    private readonly AppDbContext _context;
    private readonly ILeitorPlanilha _leitorPlanilha;
    private readonly ProcessarDados _processamento;

    public PlanilhaController(
        AppDbContext context, 
        ILeitorPlanilha leitorPlanilha,
        ProcessarDados processamento
        )
    {
        _context = context;
        _leitorPlanilha = leitorPlanilha;
        _processamento = processamento;
    }

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
        var listaPedidos = await _leitorPlanilha.LerPedidos(planilha);

        await ProcessarPlanilha(listaPedidos);

        return Ok();
    }

    private async Task<ActionResult> ProcessarPlanilha(IEnumerable<PlanilhaDTO> listaPedidos)
    {
        // Checar se arquivo existe e possui conteúdo (garantir)
        if (listaPedidos is null || !listaPedidos.Any())
        {
            return BadRequest("Dados da planilha estão vazios");
        }

        foreach (var pedido in listaPedidos)
        {
            await _processamento.CadastrarCliente(pedido);
            await _processamento.CadastrarProdutoPedido(pedido);
        }

        return Ok();
    }

}
