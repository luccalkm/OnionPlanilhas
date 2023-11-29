namespace Dominio;

public class Pedido
{
    public int Id { get; set; }
    public DateOnly Data { get; set; }
    public String ClienteId { get; set; }
    public Cliente Cliente { get; set; }
    public ICollection<ProdutoPedido> ProdutoPedidos { get; set; } = new List<ProdutoPedido>();
}
