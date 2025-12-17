using System.ComponentModel.DataAnnotations;

namespace GastosResidenciaisAPI.Domain.Entities
{
    public class Person
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Range(0, 120)]
        public int Age { get; set; }
    }
}
