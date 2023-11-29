using Dominio;
using Microsoft.EntityFrameworkCore;

namespace Aplicacao.Persistencia;

public class DbInitializer
{
    // Adicionar dados base em banco de dados
    private static void SeedData(AppDbContext context)
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
            context.Produtos.AddRange(produtos);
            context.SaveChanges();
        }
    }
}
