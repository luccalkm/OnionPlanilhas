using Dominio;
using Microsoft.EntityFrameworkCore;

namespace Aplicacao.Persistencia;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Referência de tabelas
    public DbSet<Pedido> Pedidos { get; set; }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<ProdutoPedido> ProdutoPedidos { get; set; }

    // Adicionar configurações na criação de tabelas
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Adicionar chave primária em NumeroDocumento
        modelBuilder.Entity<Cliente>()
            .HasKey(k => k.NumeroDocumento);
    }
}
