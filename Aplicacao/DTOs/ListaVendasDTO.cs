using System.Reflection.Metadata.Ecma335;

namespace Aplicacao.DTOs;

public class ListaVendasDTO
{
    public string Cliente { get; set; }
    public string Produto { get; set; }
    public decimal ValorTotal { get; set; }
    public DateOnly DataEntrega { get; set; }
}
