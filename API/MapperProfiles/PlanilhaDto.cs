using API.DTOs;
using AutoMapper;

namespace API.MapperProfiles
{
    public class PlanilhaDto : Profile
    {
        public PlanilhaDto() 
        {
            // Mapeamento de campos da PlanilhaDTO para ClienteDTO
            CreateMap<PlanilhaDTO, ClienteDTO>()
                .ForMember(destino => destino.NumeroDocumento, opt => opt.MapFrom(src => src.NumeroDocumento))
                .ForMember(destino => destino.RazaoSocial, opt => opt.MapFrom(src => src.RazaoSocial))
                .ForMember(destino => destino.CEP, opt => opt.MapFrom(src => src.CEP));

            // Mapeamento de campos da PlanilhaDTO para PedidoDTO
            CreateMap<PlanilhaDTO, PedidoDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NumeroPedido))
                .ForMember(dest => dest.Data, opt => opt.MapFrom(src => src.Data))
                .ForMember(dest => dest.ClienteId, opt => opt.MapFrom(src => src.NumeroDocumento));

            // Mapeamento de campos de PlanilhaDTO 
            CreateMap<PlanilhaDTO, ProdutoDTO>()
                .ForMember(destino => destino.Nome, opt => opt.MapFrom(src => src.Produto));
        }
    }
}
