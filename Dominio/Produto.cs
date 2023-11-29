namespace Dominio;

public class Produto
{
    public int Id { get; set; }
    public String Nome { get; set; }
    public decimal Preco { get; set; }
    public ICollection<ProdutoPedido> ProdutoPedidos { get; set; } = new List<ProdutoPedido>();
}
