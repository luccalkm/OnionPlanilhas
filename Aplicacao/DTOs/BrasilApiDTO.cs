using System.Text.Json.Serialization;

namespace Aplicacao.DTOs;

public class BrasilApiDTO
{
    public string cep { get; set; }
    public string state { get; set; }
    public string city { get; set; }
    public string neighborhood { get; set; }
    public string street { get; set; }
    public string service { get; set; }
}
