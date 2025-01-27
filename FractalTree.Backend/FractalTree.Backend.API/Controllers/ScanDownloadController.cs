using Microsoft.AspNetCore.Mvc;

namespace FractalTree.Backend.API.Controllers
{
    
    [ApiController]
    [Route("api")]
    public class ScanDownloadController : Controller
    {
        [HttpGet("scan")]
        public async Task<IActionResult> DownloadScan([FromQuery] string scanID)
        {
            var scanPath = Path.Join("/home/app/scans/", scanID);

            if (!System.IO.File.Exists(scanPath))
            {
                return NotFound();
            }

            return File(new FileStream(scanPath, FileMode.Open), "image/png");
        }
    }
}
