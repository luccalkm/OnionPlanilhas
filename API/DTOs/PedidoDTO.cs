namespace API.DTOs;

public class PedidoDTO
{
    public int Id { get; set; }
    public DateOnly Data { get; set; }
    public required String ClienteId { get; set; }
}
