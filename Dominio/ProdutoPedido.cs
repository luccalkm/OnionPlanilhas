namespace Dominio;

// Intermediário entre Pedido e Produto
// Relacionamento n...n
// Produtos com vários pedidos, pedidos com vários produtos
public class ProdutoPedido
{
    public int Id { get; set; }
    public int PedidoId { get; set; } 
    public Pedido Pedido { get; set; }
    public int ProdutoId { get; set; }
    public Produto Produto { get; set; }
}
