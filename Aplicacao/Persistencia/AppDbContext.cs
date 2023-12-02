using Dominio;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace Aplicacao.Persistencia;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Referência de tabelas
    public DbSet<Pedido> Pedidos { get; set; }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<ProdutoPedido> ProdutoPedidos { get; set; }
    public DbSet<Regiao> Regiao { get; set; }

    // É necessário adicionar configuração para campos das tabelas pois o EF por padrão
    // limita os campos a alguns tipos de dados bem genéricos que podem ser prejudiciais
    // em questão de performance.
    // Por se tratar de uma aplicação pequena, nem tanto, mas é uma boa prática.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        ConfigurarTabelaCliente(modelBuilder);
        ConfigurarTabelaPedido(modelBuilder);
        ConfigurarTabelaRegiao(modelBuilder);
    }

    private static void ConfigurarTabelaPedido(ModelBuilder modelBuilder)
    {
        // Configurações da tabela Pedido
        modelBuilder.Entity<Pedido>()
            .Property(p => p.ClienteId)
            .IsRequired()
            .HasMaxLength(14);

        modelBuilder.Entity<Pedido>()
            .Property(p => p.Data)
            .IsRequired();

        modelBuilder.Entity<Pedido>()
            .Property(p => p.ClienteId)
            .IsRequired()
            .HasMaxLength(14);

        modelBuilder.Entity<Pedido>()
            .HasIndex(p => new { p.ClienteId, p.Data });


    }
    private static void ConfigurarTabelaCliente(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>()
            .HasKey(k => k.NumeroDocumento);

        modelBuilder.Entity<Cliente>()
            .Property(p => p.NumeroDocumento)
            .IsRequired()
            .HasMaxLength(14);

        modelBuilder.Entity<Cliente>()
            .Property(p => p.CEP)
            .IsRequired()
            .HasMaxLength(8);

        modelBuilder.Entity<Cliente>()
            .Property(p => p.RazaoSocial)
            .IsRequired()
            .HasMaxLength(100);

        modelBuilder.Entity<Cliente>()
            .HasIndex(p => new { p.NumeroDocumento, p.CEP } );
    }
    private static void ConfigurarTabelaRegiao(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Regiao>()
            .Property(p => p.UF)
            .HasMaxLength(2);

        modelBuilder.Entity<Regiao>()
            .Property(p => p.Nome)
            .HasMaxLength(50);

        modelBuilder.Entity<Regiao>()
            .HasIndex(p => p.UF);
    }
}
