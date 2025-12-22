namespace GastosResidenciaisAPI.Application.DTOs
{
    /// <summary>
    /// DTO utilizado para retorno de dados da pessoa.
    /// </summary>
    public class PersonDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
    }
}
