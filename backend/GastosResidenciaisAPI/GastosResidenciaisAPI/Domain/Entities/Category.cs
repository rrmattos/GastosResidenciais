using GastosResidenciaisAPI.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace GastosResidenciaisAPI.Domain.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public CategoryPurpose Purpose { get; set; }
    }
}
