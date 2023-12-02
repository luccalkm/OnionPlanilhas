
using Aplicacao.DTOs;

public class DashboardDTO
{
    public IEnumerable<ListaVendasDTO> listaVendas { get; set; }
    public IEnumerable<VendasProdutoDTO> vendasPorProduto { get; set; }
    public IEnumerable<VendasRegiaoDTO> vendasPorRegiao { get; set; }
}