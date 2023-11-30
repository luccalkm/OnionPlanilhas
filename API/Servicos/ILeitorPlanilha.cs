using API.DTOs;

namespace API.Servicos;

public interface ILeitorPlanilha
{
    Task<IEnumerable<PlanilhaDTO>> LerPedidos(IFormFile planilha);
}
