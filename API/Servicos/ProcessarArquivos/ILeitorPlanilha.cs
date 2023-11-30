using Aplicacao.DTOs;

namespace API.Servicos.ProcessarArquivos;

public interface ILeitorPlanilha
{
    Task<IEnumerable<PlanilhaDTO>> LerPedidos(IFormFile planilha);
}
