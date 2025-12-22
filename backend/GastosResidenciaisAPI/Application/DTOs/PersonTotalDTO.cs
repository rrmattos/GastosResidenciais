namespace GastosResidenciaisAPI.Application.DTOs
{
    public class PersonTotalDTO
    {
        public int PersonId { get; set; }
        public string PersonName { get; set; } = string.Empty;
        public decimal TotalReceita { get; set; }
        public decimal TotalDespesa { get; set; }

        public decimal Balance => TotalReceita - TotalDespesa;
    }
}
