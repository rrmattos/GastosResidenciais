namespace GastosResidenciaisAPI.Application.Exceptions
{ 
    /// <summary>
    /// Exceção utilizada para violações de regras de negócio.
    /// Deve ser utilizada pelos controllers para retorno HTTP adequado.
    /// </summary>
    public class ValidationException : Exception
    {
        public ValidationException(string message) : base(message) { }
    }
}
