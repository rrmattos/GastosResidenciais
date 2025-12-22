using GastosResidenciaisAPI.Domain.Entities;
using GastosResidenciaisAPI.Domain.Enums;

namespace GastosResidenciaisAPI.Application.DTOs
{
    /// <summary>
    /// DTO utilizado para retorno de dados da transação.
    /// </summary>
    public class TransactionDTO
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Value { get; set; }
        public TransactionType Type { get; set; }
        public int CategoryId { get; set; }
        public int PersonId { get; set; }
    }
}
