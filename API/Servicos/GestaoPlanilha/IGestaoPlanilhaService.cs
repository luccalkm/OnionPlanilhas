using API.Servicos.GestaoPlanilha;
using Aplicacao.DTOs;
using Aplicacao.Servicos;

namespace API.Servicos.ProcessarArquivos;

public interface IGestaoPlanilhaService
{
    Task<IEnumerable<PlanilhaDTO>> LerPedidos(IFormFile planilha);
    Task<ResultadoProcessamento> ProcessarPlanilha(IEnumerable<PlanilhaDTO> listaPedidos, ProcessarDados processamento);
}
