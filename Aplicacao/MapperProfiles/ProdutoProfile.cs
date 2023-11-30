using Aplicacao.DTOs;
using AutoMapper;
using Dominio;

namespace API.MapperProfiles;

public class ProdutoProfile : Profile
{
    public ProdutoProfile() 
    {
        CreateMap<ProdutoDTO, Produto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Preco, opt => opt.MapFrom(src => src.Preco))
            .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.Nome));
    }
}
