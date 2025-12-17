using GastosResidenciaisAPI.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace GastosResidenciaisAPI.Application.DTOs
{
    /// <summary>
    /// DTO utilizado para criação de uma categoria.
    /// </summary>
    public class CreateCategoryDTO
    {
        [Required]
        [MaxLength(100)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public CategoryPurpose Purpose { get; set; }
    }
}
