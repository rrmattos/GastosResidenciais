using GastosResidenciaisAPI.Application.DTOs;
using GastosResidenciaisAPI.Application.Exceptions;
using GastosResidenciaisAPI.Domain.Entities;
using GastosResidenciaisAPI.Domain.Enums;
using GastosResidenciaisAPI.Infra.Data;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciaisAPI.Application.Services
{
    /// <summary>
    /// Serviço responsável por encapsular todas as regras de negócio
    /// relacionadas à entidade Transaction (Transação).
    /// </summary>
    public class TransactionService
    {
        private readonly AppDbContext _context;

        public TransactionService(AppDbContext context) 
        {
            _context = context;
        }

        /// <summary>
        /// Cria uma nova transação no sistema.
        /// </summary>
        public async Task<TransactionDTO> CreateAsync(CreateTransactionDTO dto)
        {
            var person = await _context.Persons
                .FirstOrDefaultAsync(p => p.Id == dto.PersonId)
                ?? throw new ValidationException("Pessoa não encontrada.");

            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.Id == dto.CategoryId)
                ?? throw new ValidationException("Categoria não encontrada.");

            if (person.Age < 18 && dto.Type == TransactionType.Receita)
                throw new ValidationException("Menores de idade não podem registrar uma transação de Receita.");

            if (category.Purpose == CategoryPurpose.Despesa && dto.Type == TransactionType.Receita)
                throw new ValidationException("Categoria inválida para Receita.");

            if (category.Purpose == CategoryPurpose.Receita && dto.Type == TransactionType.Despesa)
                throw new ValidationException("Categoria inválida para Despesa.");

            var transaction = new Transaction
            {
                Description = dto.Description,
                Value = dto.Value,
                Type = dto.Type,
                CategoryId = dto.CategoryId,
                PersonId = dto.PersonId
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return new TransactionDTO
            {
                Id = transaction.Id,
                Description = transaction.Description,
                Value = transaction.Value,
                Type = transaction.Type,
                CategoryId = transaction.CategoryId,
                PersonId = transaction.PersonId
            };
        }

        /// <summary>
        /// Retorna todas as transações cadastradas.
        /// </summary>
        public async Task<List<TransactionDTO>> GetAllAsync()
        {
            return await _context.Transactions
                .AsNoTracking()
                .Select(t => new TransactionDTO
                {
                    Id = t.Id,
                    Description = t.Description,
                    Value = t.Value,
                    Type = t.Type,
                    CategoryId = t.CategoryId,
                    PersonId = t.PersonId
                })
                .ToListAsync();
        }

        /// <summary>
        /// Retorna uma transação cadastrada, pelo seu id.
        /// </summary>
        public async Task<TransactionDTO> GetByIdAsync(int transactionId)
        {
            /// Se transaction retornar nulo, joga uma exceção.
            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == transactionId) ??
                    throw new ValidationException("Transação não encontrada.");

            return new TransactionDTO
            {
                Id = transaction.Id,
                Description = transaction.Description,
                Value = transaction.Value,
                Type = transaction.Type,
                CategoryId = transaction.CategoryId,
                PersonId = transaction.PersonId
            };
        }
    }
}
