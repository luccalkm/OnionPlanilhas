using Aplicacao.Persistencia;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adicionar conex�o com o banco de dados conforme banco de dados utilizado
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Cria��o de banco de dados
// "using" no escopo para otimiza��o
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    // Executar migration
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();

    // Inicializar dados padr�es no banco de dados
    await DbInitializer.SeedData(context);
}
catch (Exception e)
{
    // Registro de erros de migrations em log
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(e, "Um erro ocorreu durante a migra��o do banco de dados.");
}


app.Run();
