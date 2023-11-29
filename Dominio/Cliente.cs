using System.ComponentModel.DataAnnotations;

namespace Dominio;

public class Cliente
{
    public String NumeroDocumento { get; set; }
    public String RazaoSocial { get; set; }
    public String CEP { get; set; }
    public ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
