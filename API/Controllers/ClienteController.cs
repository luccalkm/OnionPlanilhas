using Aplicacao.Persistencia;
using Dominio;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ClienteController
{
    private readonly AppDbContext _context;

    public ClienteController(AppDbContext context)
    {
        _context = context;
    }

}
