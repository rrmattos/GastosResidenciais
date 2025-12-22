using GastosResidenciaisAPI.Domain.Enums;

namespace GastosResidenciaisAPI.Application.DTOs
{
    /// <summary>
    /// DTO utilizado para retorno de dados da categoria.
    /// </summary>
    public class CategoryDTO
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public CategoryPurpose Purpose { get; set; }
    }
}
