using API.DTOs;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Logging;
using OfficeOpenXml;
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace API.Servicos;

public class LeitorPlanilha : ILeitorPlanilha
{
    private readonly ILogger<LeitorPlanilha> _logger;
    public LeitorPlanilha(ILogger<LeitorPlanilha> logger)
    {
        _logger = logger;
    }
    public async Task <IEnumerable<PlanilhaDTO>> LerPedidos(IFormFile planilha)
    {
        // Checa se a planilha é nula caso algum erro aconteça no código do controlador
        if (planilha is null) return null;

        // Lista para registrar os pedidos
        var listaPedidos = new List<PlanilhaDTO>();

        using var stream = new MemoryStream();
        await planilha.CopyToAsync(stream);

        using var package = new ExcelPackage(stream);
        var worksheet = package.Workbook.Worksheets[0];

        // Pega o número de linhas da planilha
        int totalLinhas = worksheet.Dimension.Rows;

        for (int row = 2; row <= totalLinhas; row++)
        {
            var itemPlanilha = new PlanilhaDTO
            {
                NumeroDocumento = RemoverCaracteresEspeciais(worksheet.Cells[row, 1].Value.ToString()!.Trim()),
                RazaoSocial = worksheet.Cells[row, 2].Value.ToString()!.Trim(),
                CEP = worksheet.Cells[row, 3].Value.ToString()!.Trim(),
                Produto = worksheet.Cells[row, 4].Value.ToString()!.Trim(),
                NumeroPedido = int.Parse(worksheet.Cells[row, 5].Value.ToString()!.Trim()),
                Data = ConverterDateTimeEmDateOnly(worksheet.Cells[row, 6].Value.ToString()!.Trim()),
            };

            ;
            listaPedidos.Add(itemPlanilha);
        }

        return listaPedidos;
    }

    private String RemoverCaracteresEspeciais(string texto)
    {
        if (string.IsNullOrWhiteSpace(texto))
        {
            throw new ArgumentNullException("O texto não pode ser nulo ou vazio.", nameof(texto));
        }

        // Um Regex para filtar o campo de identificação do cliente, sendo CPF ou CNPJ, obtendo apenas os digitos [0-9]
        var regraObterDigitos = new Regex(@"[^\d]");
        return regraObterDigitos.Replace(texto, "");
    }

    // Na planilha o formato da  data solicitado é "dd/MM/yyyy"
    // Como estava sendo lido "DateTime", foi necessário converter para "DateOnly"
    private DateOnly ConverterDateTimeEmDateOnly(string stringData)
    {
        if(string.IsNullOrWhiteSpace(stringData))
        {
            throw new ArgumentNullException("A data não pode ser nula ou vazia.", nameof(stringData));
        }

        var formatoData = "dd/MM/yyyy HH:mm:ss";
        if(DateTime.TryParseExact(stringData, formatoData, CultureInfo.InvariantCulture, DateTimeStyles.None, out var data))
        {
            return DateOnly.FromDateTime(data);
        }
        else
        {
            throw new FormatException("A data não está no formato correto.");
        }
    }

}
