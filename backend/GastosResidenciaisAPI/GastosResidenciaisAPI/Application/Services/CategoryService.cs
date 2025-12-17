using GastosResidenciaisAPI.Application.DTOs;
using GastosResidenciaisAPI.Application.Exceptions;
using GastosResidenciaisAPI.Domain.Entities;
using GastosResidenciaisAPI.Infra.Data;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciaisAPI.Application.Services
{    
    /// <summary>
    /// Serviço responsável por encapsular todas as regras de negócio
    /// relacionadas à entidade Category (Categoria).
    /// </summary>
    public class CategoryService
    {
        public readonly AppDbContext _context;

        public CategoryService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Cria uma nova categoria no sistema.
        /// </summary>
        public async Task<CategoryDTO> CreateAsync(CreateCategoryDTO dto)
        {
            var category = new Category
            {
                Description = dto.Description,
                Purpose = dto.Purpose,
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return new CategoryDTO
            {
                Id = category.Id,
                Description = category.Description,
                Purpose = category.Purpose,
            };
        }

        /// <summary>
        /// Retorna todas as categorias cadastradas.
        /// </summary>
        public async Task<List<CategoryDTO>> GetAllAsync()
        {
            return await _context.Categories
                .AsNoTracking()
                .Select(c => new CategoryDTO
                {
                    Id = c.Id,
                    Description = c.Description,
                    Purpose = c.Purpose,
                })
                .ToListAsync();
        }

        /// <summary>
        /// Retorna uma categoria cadastrada, pelo seu id.
        /// </summary>
        public async Task<CategoryDTO> GetByIdAsync(int categoryId)
        {
            /// Se category retornar nulo, joga uma exceção.
            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.Id == categoryId) ??
                    throw new ValidationException("Categoria não encontrada.");

            return new CategoryDTO
            {
                Id = category.Id,
                Description = category.Description,
                Purpose = category.Purpose,
            };
        }
    }
}
