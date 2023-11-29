using Aplicacao.Persistencia;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PedidoController : ControllerBase
{
    private readonly AppDbContext _context;

    public PedidoController(AppDbContext context)
    {
        _context = context;
    }

    [Consumes("multipart/form-data")]
    [HttpPost("ImportarPlanilha")]
    public async Task<IActionResult> ImportarPlanilha(IFormFile planilha)
    {
        if(planilha == null || planilha.Length == 0) 
        {
            return BadRequest("Arquivo não fornecido corretamente.");
        }

        //var extensao =  Path.GetExtension(planilha.FileName);
        //if (extensao != ".csv" || extensao != ".xlsx")
        //{
        //    return BadRequest("Formato de arquivo inválido. Por favor, insira um arquivo no formato csv ou xlsx");
        //}


        return Ok("Pedidos importados com sucesso.");
    }
}
