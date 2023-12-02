using API.Servicos.GestaoPlanilha;
using Aplicacao.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Servicos.Processamento;

public interface IProcessamentoService
{
    Task<ResultadoProcessamento> ImportarPlanilha(IFormFile planilha);
    Task<IEnumerable<VendasRegiaoDTO>> ObterVendasPorRegiao();
    Task<IEnumerable<VendasProdutoDTO>> ObterVendasPorProduto();
    Task<List<ListaVendasDTO>> ObterListaVendas();
}
