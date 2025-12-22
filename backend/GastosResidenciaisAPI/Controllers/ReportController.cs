using GastosResidenciaisAPI.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciaisAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly ReportService _reportService;

        public ReportController(ReportService reportService)
        {
            _reportService = reportService;
        }

        /// <summary>
        /// Consulta de totais financeiros por pessoa.
        /// </summary>
        [HttpGet("totals-by-person")]
        public async Task<IActionResult> GetTotalsByPerson()
        {
            var result = await _reportService.GetTotalsByPersonAsync();
            return Ok(result);
        }

        /// <summary>
        /// Consulta de totais financeiros por categoria.
        /// </summary>
        [HttpGet("totals-by-category")]
        public async Task<IActionResult> GetTotalsByCategory()
        {
            var result = await _reportService.GetTotalsByCategoryAsync();
            return Ok(result);
        }

    }
}
