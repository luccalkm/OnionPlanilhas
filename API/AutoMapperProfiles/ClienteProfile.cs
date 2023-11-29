using API.DTOs;
using AutoMapper;
using Dominio;

namespace API.AutoMapperProfiles;

public class ClienteProfile : Profile
{
    public ClienteProfile()
    {
        // Mapeamento entre objeto de transporte de informação
        CreateMap<ClienteDTO, Cliente>()
            .ForMember(dest => dest.NumeroDocumento, opt => opt.MapFrom(src => src.NumeroDocumento))
            .ForMember(dest => dest.RazaoSocial, opt => opt.MapFrom(src => src.RazaoSocial))
            .ForMember(dest => dest.CEP, opt => opt.MapFrom(src => src.CEP));

        // Mapeamento entre objeto de transporte de informações da planilha para o objeto
        CreateMap<PlanilhaDTO, Cliente>()
            .ForMember(dest => dest.NumeroDocumento, opt => opt.MapFrom(src => src.NumeroDocumento))
            .ForMember(dest => dest.RazaoSocial, opt => opt.MapFrom(src => src.RazaoSocial))
            .ForMember(dest => dest.CEP, opt => opt.MapFrom(src => src.CEP));
    }
}
