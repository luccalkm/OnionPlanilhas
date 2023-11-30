using API.DTOs;
using AutoMapper;
using Dominio;

namespace API.MapperProfiles;

public class ClienteProfile : Profile
{
    public ClienteProfile()
    {
        // Mapeamento entre objeto de transporte de informação
        CreateMap<ClienteDTO, Cliente>()
            .ForMember(destino => destino.NumeroDocumento, opt => opt.MapFrom(src => src.NumeroDocumento))
            .ForMember(destino => destino.RazaoSocial, opt => opt.MapFrom(src => src.RazaoSocial))
            .ForMember(destino => destino.CEP, opt => opt.MapFrom(src => src.CEP));
    }
}
