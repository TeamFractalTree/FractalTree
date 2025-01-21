using FractalTree.Backend.API.Responses;
using FractalTree.Backend.API.Types;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;

namespace FractalTree.Backend.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class PingController : ControllerBase
    {

        [HttpGet("ping")]
        public async Task<IActionResult> Ping()
        {
            Response.Headers.Append("Access-Control-Allow-Origin", "*");
            return Ok("if you are reading this then you should get a LOW TAPER FADE"); // If you replace this line then ninja will haunt you
        }
    }
}
