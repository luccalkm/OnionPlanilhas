using Aplicacao.DTOs;
using AutoMapper;
using Dominio;

namespace API.MapperProfiles;

public class PlanilhaProfile : Profile
{
    public PlanilhaProfile() 
    {
        // Mapeamento de campos da PlanilhaDTO para ClienteDTO
        CreateMap<PlanilhaDTO, Cliente>()
            .ForMember(destino => destino.NumeroDocumento, opt => opt.MapFrom(src => src.NumeroDocumento))
            .ForMember(destino => destino.RazaoSocial, opt => opt.MapFrom(src => src.RazaoSocial))
            .ForMember(destino => destino.CEP, opt => opt.MapFrom(src => src.CEP));

        // Mapeamento de campos da PlanilhaDTO para PedidoDTO
        CreateMap<PlanilhaDTO, Pedido>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NumeroPedido))
            .ForMember(dest => dest.Data, opt => opt.MapFrom(src => src.Data))
            // Registrar FK Cliente do Pedido
            .ForMember(dest => dest.ClienteId, opt => opt.MapFrom(src => src.NumeroDocumento));

        // Mapeamento de campos de PlanilhaDTO 
        CreateMap<PlanilhaDTO, ProdutoDTO>()
            .ForMember(destino => destino.Nome, opt => opt.MapFrom(src => src.Produto));

    }
}
