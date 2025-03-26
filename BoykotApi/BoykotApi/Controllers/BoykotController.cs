using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Boykot.Interfaces;
using Boykot.Models.Request;
using Boykot.Models.Response;

namespace Boykot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoykotController : ControllerBase
    {
        private readonly IBoykotService _boykotService;

        public BoykotController(IBoykotService boykotService)
        {
            _boykotService = boykotService;
        }

        [HttpPost("QueryBarcode")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(QueryBarcodeResponse))]
        public async Task<IActionResult> QueryBarcode(QueryBarcodeRequest request)
        {
            return Ok(await _boykotService.QueryBarcode(request));
        }
    }
}
