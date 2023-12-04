using Aplicacao.DTOs;
using Aplicacao.Persistencia;
using AutoMapper;
using Dominio;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Aplicacao.Servicos.Integracao;

public class BrasilApi
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly AppDbContext _context;
    private readonly string urlBrasilApi;
    private readonly IMapper _mapper;

    public BrasilApi(IMapper mapper, IHttpClientFactory httpClientFactory, IConfiguration configuration, AppDbContext context)
    {
        _httpClientFactory = httpClientFactory;
        urlBrasilApi = configuration["Integracao:UrlBrasilApi"] ?? throw new InvalidOperationException("URL BrasilApi não configurada.");
        _context = context;
        _mapper = mapper;
    }

    public async Task<RegiaoDTO> ObterRegiaoPorCep(string cep)
    {
        // Adiciona um atraso de 1 segundo para evitar bloqueio em testes
        await Task.Delay(1000);

        var httpClient = _httpClientFactory.CreateClient();
        var url = string.Format(urlBrasilApi, cep);
        var response = await httpClient.GetAsync(url);
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            var cepInfo = JsonConvert.DeserializeObject<BrasilApiDTO>(content);

            Console.WriteLine(content);
            Console.WriteLine(cepInfo.state);

            if (cepInfo != null)
            {
                var regiao = await _context.Regiao
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.UF == cepInfo.state);

                return regiao == null
                    ? new RegiaoDTO { Nome = "Cep inválido", UF = "XX" }
                    : _mapper.Map<RegiaoDTO>(regiao);
            }
        }
        throw new KeyNotFoundException("Não foi possível encontrar a região para o CEP fornecido.");
    }
}
