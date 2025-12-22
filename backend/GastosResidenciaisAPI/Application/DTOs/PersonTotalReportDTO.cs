namespace GastosResidenciaisAPI.Application.DTOs
{
    public class PersonTotalReportDTO
    {
        public List<PersonTotalDTO> Persons { get; set; } = new();
        public decimal TotalReceita { get; set; }
        public decimal TotalDespesa { get; set; }

        public decimal Balance => TotalReceita - TotalDespesa;
    }
}
