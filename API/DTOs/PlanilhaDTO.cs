namespace API.DTOs;

// Recebimento de dados da planilha será alocado através da criação de um objeto PlanilhaDTO
// Assim a realocação de cada dado respectivo de cada objeto será facilitada
//
// Exemplo:
// NumeroPedido e Data --> Pedido
// NumeroDocumento, RazaoSocial, CEP ---> Cliente
// Produto --> Produto
//
public class PlanilhaDTO
{
    public string NumeroDocumento { get; set; }
    public string RazaoSocial { get; set; }
    public string CEP { get; set; }
    public string Produto { get; set; }
    public int NumeroPedido { get; set; }
    public DateOnly Data {  get; set; }
}
