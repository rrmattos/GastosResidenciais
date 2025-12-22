using System.ComponentModel.DataAnnotations;

namespace GastosResidenciaisAPI.Application.DTOs
{
    /// <summary>
    /// DTO utilizado para criação de uma pessoa.
    /// </summary>
    public class CreatePersonDTO
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Range(0, 150)]
        public int Age { get; set; }
    }
}
