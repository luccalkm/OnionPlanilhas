using Aplicacao.DTOs;
using AutoMapper;
using Dominio;

namespace Aplicacao.MapperProfiles;

public class RegiaoProfile : Profile
{
    public RegiaoProfile()
    {
        CreateMap<Regiao, RegiaoDTO>();
    }
}
