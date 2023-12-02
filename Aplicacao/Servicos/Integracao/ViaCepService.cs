using Aplicacao.DTOs;
using Aplicacao.Persistencia;
using AutoMapper;
using Dominio;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Aplicacao.Servicos.Integracao;

public class ViaCepService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly AppDbContext _context;
    private readonly string urlViaCep;
    private readonly IMapper _mapper;

    public ViaCepService(IMapper mapper, IHttpClientFactory httpClientFactory, IConfiguration configuration, AppDbContext context)
    {
        _httpClientFactory = httpClientFactory;
        urlViaCep = configuration["Integracao:UrlViaCep"] ?? throw new InvalidOperationException("URL ViaCep não configurada.");
        _context = context;
        _mapper = mapper;
    }

    public async Task<RegiaoDTO> ObterRegiaoPorCep(string cep)
    {
        var httpClient = _httpClientFactory.CreateClient();
        var url = string.Format(urlViaCep, cep);
        var response = await httpClient.GetAsync(url);
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            var cepInfo = JsonConvert.DeserializeObject<ViaCepDTO>(content);

            if (cepInfo != null)
            {
                var regiao = await _context.Regiao
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.UF == cepInfo.Uf);

                return regiao == null
                    ? throw new KeyNotFoundException("Não foi possível encontrar a região para o CEP fornecido.")
                    : _mapper.Map<RegiaoDTO>(regiao);
            }
        }
        await Console.Out.WriteLineAsync(cep);
        throw new KeyNotFoundException("Não foi possível encontrar a região para o CEP fornecido.");
    }
}
