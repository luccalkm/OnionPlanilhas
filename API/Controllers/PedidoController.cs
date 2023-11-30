using API.DTOs;
using API.Servicos;
using Aplicacao.Persistencia;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PedidoController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILeitorPlanilha _leitorPlanilha;

    public PedidoController(AppDbContext context, ILeitorPlanilha leitorPlanilha)
    {
        _context = context;
        _leitorPlanilha = leitorPlanilha;
    }

    [Consumes("multipart/form-data")]
    [HttpPost("ImportarPlanilha")]
    public async Task<ActionResult<PlanilhaDTO>> ImportarPlanilha(IFormFile planilha)
    {
        if(planilha == null || planilha.Length == 0) 
        {
            return BadRequest("Arquivo não fornecido corretamente.");
        }

        var pedidos = _leitorPlanilha.LerPedidos(planilha);

        await Console.Out.WriteLineAsync();

        //var extensao =  Path.GetExtension(planilha.FileName);
        //if (extensao != ".csv" || extensao != ".xlsx")
        //{
        //    return BadRequest("Formato de arquivo inválido. Por favor, insira um arquivo no formato csv ou xlsx");
        //}


        return Ok(pedidos);
    }
}
