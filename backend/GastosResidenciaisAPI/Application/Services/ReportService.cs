using GastosResidenciaisAPI.Application.DTOs;
using GastosResidenciaisAPI.Domain.Enums;
using GastosResidenciaisAPI.Infra.Data;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciaisAPI.Application.Services
{
    /// <summary>
    /// Serviço responsável por consultas agregadas (relatórios).
    /// </summary>
    public class ReportService
    {
        private readonly AppDbContext _context;

        public ReportService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retorna os totais financeiros agrupados por pessoa.
        /// </summary>
        public async Task<PersonTotalReportDTO> GetTotalsByPersonAsync()
        {
            var persons = await _context.Persons
                .Include(p => p.Transactions)
                .AsNoTracking()
                .ToListAsync();

            var result = persons.Select(p => new PersonTotalDTO
            {
                PersonId = p.Id,
                PersonName = p.Name,

                TotalReceita = p.Transactions
                    .Where(t => t.Type == TransactionType.Receita)
                    .Sum(t => t.Value),

                TotalDespesa = p.Transactions
                    .Where(t => t.Type == TransactionType.Despesa)
                    .Sum(t => t.Value)
            }).ToList();

            return new PersonTotalReportDTO
            {
                Persons = result,
                TotalReceita = result.Sum(p => p.TotalReceita),
                TotalDespesa = result.Sum(p => p.TotalDespesa)
            };
        }

        public async Task<List<CategoryTotalDTO>> GetTotalsByCategoryAsync()
        {
            var categories = await _context.Categories
                .Include(c => c.Transactions)
                .AsNoTracking()
                .ToListAsync();

            return categories.Select(c => new CategoryTotalDTO
            {
                CategoryId = c.Id,
                Description = c.Description,

                TotalReceita = c.Transactions
                    .Where(t => t.Type == TransactionType.Receita)
                    .Sum(t => t.Value),

                TotalDespesa = c.Transactions
                    .Where(t => t.Type == TransactionType.Despesa)
                    .Sum(t => t.Value)
            }).ToList();
        }
    }
}
