namespace GastosResidenciaisAPI.Application.DTOs
{
    public class CategoryTotalDTO
    {
        public int CategoryId { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal TotalReceita { get; set; }
        public decimal TotalDespesa { get; set; }
        public decimal Balance => TotalReceita - TotalDespesa;
    }
}
