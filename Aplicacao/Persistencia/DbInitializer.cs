using Dominio;
using Microsoft.EntityFrameworkCore;

namespace Aplicacao.Persistencia;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context)
    {
        await SeedDataRegiaoPorUf(context);
        await SeedDataPedidos(context);
    }
    private static async Task SeedDataRegiaoPorUf(AppDbContext context)
    {
        if (!context.Regiao.Any())
        {
            var regioes = new List<Regiao>()
            {
                new Regiao { Id = 1, Nome = "Norte", UF = "AC" },
                new Regiao { Id = 2, Nome = "Nordeste", UF = "AL" },
                new Regiao { Id = 3, Nome = "Norte", UF = "AP" },
                new Regiao { Id = 4, Nome = "Norte", UF = "AM" },
                new Regiao { Id = 5, Nome = "Nordeste", UF = "BA" },
                new Regiao { Id = 6, Nome = "Nordeste", UF = "CE" },
                new Regiao { Id = 7, Nome = "Centro-Oeste", UF = "DF" },
                new Regiao { Id = 8, Nome = "Sudeste", UF = "ES" },
                new Regiao { Id = 9, Nome = "Centro-Oeste", UF = "GO" },
                new Regiao { Id = 10, Nome = "Nordeste", UF = "MA" },
                new Regiao { Id = 11, Nome = "Centro-Oeste", UF = "MT" },
                new Regiao { Id = 12, Nome = "Centro-Oeste", UF = "MS" },
                new Regiao { Id = 13, Nome = "Sudeste", UF = "MG" },
                new Regiao { Id = 14, Nome = "Norte", UF = "PA" },
                new Regiao { Id = 15, Nome = "Nordeste", UF = "PB" },
                new Regiao { Id = 16, Nome = "Sul", UF = "PR" },
                new Regiao { Id = 17, Nome = "Nordeste", UF = "PE" },
                new Regiao { Id = 18, Nome = "Nordeste", UF = "PI" },
                new Regiao { Id = 19, Nome = "Sudeste", UF = "RJ" },
                new Regiao { Id = 20, Nome = "Nordeste", UF = "RN" },
                new Regiao { Id = 21, Nome = "Sul", UF = "RS" },
                new Regiao { Id = 22, Nome = "Norte", UF = "RO" },
                new Regiao { Id = 23, Nome = "Norte", UF = "RR" },
                new Regiao { Id = 24, Nome = "Sul", UF = "SC" },
                new Regiao { Id = 25, Nome = "Sudeste", UF = "SP" },
                new Regiao { Id = 26, Nome = "Nordeste", UF = "SE" },
                new Regiao { Id = 27, Nome = "Norte", UF = "TO" }
            };
            await context.Regiao.AddRangeAsync(regioes);
            await context.SaveChangesAsync();
        }
    }

    private static async Task SeedDataPedidos(AppDbContext context)
    {
        context.Database.Migrate();

        // Inserir dados base de Pedidos caso já não existam
        if (!context.Pedidos.Any())
        {
            var produtos = new List<Produto>()
            {
                new Produto
                {
                    Id = 1,
                    Nome = "Televisão",
                    Preco = 5000
                },
                new Produto
                {
                    Id = 2,
                    Nome = "Celular",
                    Preco = 1000
                },
                new Produto
                {
                    Id = 3,
                    Nome = "Notebook",
                    Preco = 3000
                },
            };
            await context.Produtos.AddRangeAsync(produtos);
            await context.SaveChangesAsync();
        }
    }
}
