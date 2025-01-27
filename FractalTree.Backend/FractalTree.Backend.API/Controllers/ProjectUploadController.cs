using FractalTree.Backend.API.Responses;
using FractalTree.Backend.API.Types;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;

namespace FractalTree.Backend.API.Controllers
{
    [ApiController]
    [Route("api/hub")]
    public class ProjectUploadController : ControllerBase
    {

        [HttpPost("upload")]
        public async Task<IActionResult> Upload([FromBody] Project projectToUpload)
        {
            // TODO: Verify that the client has possesion of the project's private key
            // This makes sure that only the client that created the project can publish it

            try {
                var projectFilePath = "/ftdata/projecthub/" + projectToUpload.HubId + ".json";
                var alreadyExists = System.IO.File.Exists(projectFilePath);

                System.IO.File.WriteAllText(projectFilePath, JsonConvert.SerializeObject(projectToUpload));
    
                return alreadyExists ? Ok() : Created();
            }
            catch {
                return BadRequest("error");
            }
        }
    }
}
