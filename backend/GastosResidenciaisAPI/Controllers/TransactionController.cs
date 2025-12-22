using GastosResidenciaisAPI.Application.DTOs;
using GastosResidenciaisAPI.Application.Exceptions;
using GastosResidenciaisAPI.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciaisAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly TransactionService _transactionService;

        public TransactionController(TransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        /// <summary>
        /// Cria uma nova transação.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTransactionDTO dto)
        {
            try
            {
                var result = await _transactionService.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Retorna todas as transações cadastradas.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _transactionService.GetAllAsync();
            return Ok(result);
        }

        /// <summary>
        /// Retorna uma transação pelo id.
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _transactionService.GetByIdAsync(id);
                return Ok(result);
            }
            catch (ValidationException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
