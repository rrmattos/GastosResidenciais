using GastosResidenciaisAPI.Domain.Entities;
using GastosResidenciaisAPI.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GastosResidenciaisAPI.Application.DTOs
{
    /// <summary>
    /// DTO utilizado para criação de uma transação.
    /// </summary>
    public class CreateTransactionDTO
    {
        [Required]
        [MaxLength(200)]
        public string Description { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue)]
        public decimal Value { get; set; }

        [Required]
        public TransactionType Type { get; set; }

        [ForeignKey(nameof(Category))]
        public int CategoryId { get; set; }

        [ForeignKey(nameof(Person))]
        public int PersonId { get; set; }
    }
}
