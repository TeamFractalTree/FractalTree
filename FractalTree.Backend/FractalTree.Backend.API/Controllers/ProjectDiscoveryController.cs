using FractalTree.Backend.API.Responses;
using FractalTree.Backend.API.Types;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FractalTree.Backend.API.Controllers
{
    [ApiController]
    [Route("api/hub")]
    public class ProjectDiscoveryController : ControllerBase
    {

        [HttpGet("discover")]
        public async Task<IActionResult> Discover()
        {
            try
            {
                Response.Headers.Append("Access-Control-Allow-Origin", "*");

                var projectFileList = Directory.GetFiles("/ftdata/projecthub/", "*.json", SearchOption.AllDirectories);
                var returnCount = 100; // TODO: Implement pagination instead of returning the first 100 entries
                var projectList = new Project[returnCount];

                int i = 0;
                foreach (var file in Directory.EnumerateFiles("/ftdata/projecthub/", "*.json", SearchOption.AllDirectories)) {
                    if (i >= returnCount) { break; }
                        
                    try
                    {
                        projectList[i] = JsonConvert.DeserializeObject<Project>(System.IO.File.ReadAllText(projectFileList[i]));
                        projectList[i].Id = "public"; // Redact the ID before sending to the client (it will use HubId instead)
                    }
                    catch (Exception ex)
                    {
                        projectList[i] = null;
                    }

                    i++;
                }


                return Ok(new ProjectDiscoveryResponse() { Projects = projectList });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
