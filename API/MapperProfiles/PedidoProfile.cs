using API.DTOs;
using AutoMapper;
using Dominio;

namespace API.MapperProfiles;

public class PedidoProfile : Profile
{
    public PedidoProfile()
    {
        // Mapeamento PedidoDTO para Pedido
        CreateMap<PedidoDTO, Pedido>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Data, opt => opt.MapFrom(src => src.Data))
            .ForMember(dest => dest.ClienteId, opt => opt.MapFrom(src => src.ClienteId));
    }
}
