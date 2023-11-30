using Aplicacao.DTOs;
using OfficeOpenXml;
using System.Globalization;
using System.Text.RegularExpressions;

namespace API.Servicos.ProcessarArquivos;

public class LeitorPlanilha : ILeitorPlanilha
{

    public async Task<IEnumerable<PlanilhaDTO>> LerPedidos(IFormFile planilha)
    {
        // Checa se a planilha é nula caso algum erro aconteça no código do controlador
        if (planilha is null) throw new Exception("O arquivo recebido possui valor nulo");

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
            // Verificar se chave primária de client é nula
            var numeroDocumento = worksheet.Cells[row, 1].Value;

            // Evitar registros onde registro de cliente está incompleto ou linha vazia
            if (numeroDocumento is null) continue;

            var itemPlanilha = new PlanilhaDTO
            {
                NumeroDocumento = RemoverCaracteresEspeciais(numeroDocumento.ToString()!.Trim()),
                RazaoSocial = worksheet.Cells[row, 2].Value.ToString()!.Trim(),
                CEP = RemoverCaracteresEspeciais(worksheet.Cells[row, 3].Value.ToString()!.Trim()),
                Produto = worksheet.Cells[row, 4].Value.ToString()!.Trim(),
                NumeroPedido = int.Parse(worksheet.Cells[row, 5].Value.ToString()!.Trim()),
                Data = ConverterDateTimeEmDateOnly(worksheet.Cells[row, 6].Value.ToString()!.Trim()),
            };

            listaPedidos.Add(itemPlanilha);
        }

        return listaPedidos;
    }

    // Processamento de CPF/CNPJ necessário em regra de negócio de cadastrar somente dígitos
    private string RemoverCaracteresEspeciais(string texto)
    {
        if (string.IsNullOrWhiteSpace(texto))
        {
            throw new ArgumentNullException("O texto não pode ser nulo ou vazio.", nameof(texto));
        }

        var regraObterDigitos = new Regex(@"[^\d]");
        return regraObterDigitos.Replace(texto, "");
    }

    // O formato da data fornecido é "dd/MM/yyyy", processamento necessário para manter o formato.
    private DateOnly ConverterDateTimeEmDateOnly(string stringData)
    {
        if (string.IsNullOrWhiteSpace(stringData))
        {
            throw new ArgumentNullException("A data não pode ser nula ou vazia.", nameof(stringData));
        }

        var formatoData = "dd/MM/yyyy HH:mm:ss";
        if (DateTime.TryParseExact(stringData, formatoData, CultureInfo.InvariantCulture, DateTimeStyles.None, out var data))
        {
            return DateOnly.FromDateTime(data);
        }
        else
        {
            throw new FormatException("A data não está no formato correto.");
        }
    }

}
