using API.DTOs;
using AutoMapper;
using Dominio;
namespace API.RequestHelpers;

public class PedidoProfile : Profile
{
    public PedidoProfile() 
    {
        CreateMap<PedidoDTO, Pedido>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Data, opt => opt.MapFrom(src => src.Data))
            .ForMember(dest => dest.ClienteId, opt => opt.MapFrom(src => src.ClienteId));

        CreateMap<PlanilhaDTO, Pedido>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NumeroPedido))
            .ForMember(dest => dest.Data, opt => opt.MapFrom(src => src.Data))
            .ForMember(dest => dest.ClienteId, opt => opt.MapFrom(src => src.NumeroDocumento));
    }
}
