using Aplicacao.DTOs;
using Aplicacao.Persistencia;
using Microsoft.EntityFrameworkCore;

namespace Aplicacao.Servicos.Frete;

public class FreteService
{
    private readonly AppDbContext _context;

    public FreteService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<decimal> CalcularPrecoComFrete(string nomeProduto, RegiaoDTO regiaoDTO)
    {
        var produto = await _context.Produtos
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Nome == nomeProduto);

        if(produto == null) throw new KeyNotFoundException("Produto não encontrado.");

        var preco = produto.Preco;

        if (regiaoDTO.UF == "SP") return preco;

        switch(regiaoDTO.Nome)
        {
            case "Norte":
            case "Nordeste":
                return preco *= 1.3m;
            case "Sul":
            case "Centro-Oeste":
                return preco *= 1.2m;
            case "Sudeste":
                return preco *= 1.1m;
            case "São Paulo":
                return preco *= 1.05m;
            default:
                throw new Exception("Região não existe");
        }
    }

    public DateOnly CalcularTempoEntrega(DateOnly data, RegiaoDTO regiaoDTO)
    {
        if (regiaoDTO.UF == "SP") return data;

        switch (regiaoDTO.Nome)
        {
            case "Norte":
            case "Nordeste":
                return data.AddDays(10);
            case "Sul":
            case "Centro-Oeste":
                return data.AddDays(5);
            case "Sudeste":
                return data.AddDays(1);
            default:
                break;
        }
        return data;
    }
}
