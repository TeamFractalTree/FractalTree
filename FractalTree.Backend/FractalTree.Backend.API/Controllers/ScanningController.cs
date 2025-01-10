using Microsoft.AspNetCore.Mvc;

namespace FractalTree.Backend.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class ScanningController : ControllerBase
    {
        [HttpPost("scan")]
        public async Task<IActionResult> Scan()
        {
            return Ok("I'm nothing like y'all 🗣️🗣️🔥🔥🐟🐟");
        }
    }
}
