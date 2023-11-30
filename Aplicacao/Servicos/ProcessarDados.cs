using Aplicacao.DTOs;
using Aplicacao.Persistencia;
using AutoMapper;
using Dominio;
using Microsoft.EntityFrameworkCore;

namespace Aplicacao.Servicos;

public class ProcessarDados
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ProcessarDados(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<Cliente> CadastrarCliente(PlanilhaDTO planilhaDTO)
    {
        // Verificar se cliente existe
        var clienteExistente = await _context.Clientes
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.NumeroDocumento == planilhaDTO.NumeroDocumento);

        // Caso cliente não exista, criar e registrar
        if (clienteExistente is null)
        {
            var novoCliente = _mapper.Map<Cliente>(planilhaDTO);
            _context.Clientes.Add(novoCliente);
            await _context.SaveChangesAsync();
            clienteExistente = novoCliente;
        }

        // Se o cliente já existe, retorna o DTO do cliente existente
        return _mapper.Map<Cliente>(clienteExistente);
    }

    public async Task<Pedido> CadastrarPedido(PlanilhaDTO planilhaDTO)
    {
        // Verificar se pedido já existe
        var pedidoExistente = await _context.Pedidos
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == planilhaDTO.NumeroPedido);

        // Criar pedido caso não exista
        if (pedidoExistente is null)
        {
            var novoPedido = _mapper.Map<Pedido>(planilhaDTO);
            _context.Pedidos.Add(novoPedido);
            await _context.SaveChangesAsync();
            pedidoExistente = novoPedido;
        };

        return pedidoExistente;
    }

    public async Task<Produto> VerificarProduto(PlanilhaDTO planilhaDTO)
    {
        // Verificar se produto existe
        var produtoExistente = await _context.Produtos
            .FirstOrDefaultAsync(p => p.Nome == planilhaDTO.Produto);

        // Informar que produto não existe
        if (produtoExistente is null)
        {
            throw new Exception($"Produto fornecido é inexistente no sistema. Produto: {planilhaDTO.Produto}");
        }

        return produtoExistente;
    }

    public async Task CadastrarProdutoPedido(PlanilhaDTO planilhaDTO)
    {
        var produto = await VerificarProduto(planilhaDTO);
        var pedido = await CadastrarPedido(planilhaDTO);

        // Certifique-se de que tanto o produto quanto o pedido existem
        if (produto != null && pedido != null)
        {
            var produtoPedido = new ProdutoPedido
            {
                PedidoId = pedido.Id,
                ProdutoId = produto.Id
            };

            // Adicionar ProdutoPedido no contexto e salvar as alterações
            await _context.ProdutoPedidos.AddAsync(produtoPedido);
            await _context.SaveChangesAsync();
        }
        else
        {
            throw new Exception("Pedido ou Produto não encontrado.");
        }
    }
}
