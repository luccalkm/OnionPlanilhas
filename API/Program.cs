using Aplicacao.Persistencia;
using API.Servicos.ProcessarArquivos;
using Microsoft.EntityFrameworkCore;
using System.Text;
using API.MapperProfiles;
using Aplicacao.Servicos;
using Aplicacao.Servicos.Integracao;
using Aplicacao.Servicos.Frete;
using Aplicacao.Servicos.Dashboard;
using API.Servicos.Processamento;

var builder = WebApplication.CreateBuilder(args);

// Registrar provedor de codifica��o do Windows
Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

// Adicionar Servi�os
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();
builder.Services.AddHttpClient();

// Mapeamentos
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddAutoMapper(typeof(PlanilhaProfile));
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .WithMethods("GET", "POST")
              .AllowAnyHeader();
    });
});

// Servi�os personalizados
builder.Services.AddScoped<IGestaoPlanilhaService, GestaoPlanilhaService>();
builder.Services.AddScoped<ProcessarDados>(); 
builder.Services.AddScoped<ViaCepService>();
builder.Services.AddScoped<DashboardService>();
builder.Services.AddScoped<FreteService>();
builder.Services.AddScoped<IProcessamentoService, ProcessamentoService>();



// Adicionar conex�o com o banco de dados conforme banco de dados utilizado
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("CorsPolicy");

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
    await context.Database.EnsureDeletedAsync();
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
