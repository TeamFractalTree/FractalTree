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
                var projectList = new Project[10];

                int i = 0;
                foreach (var file in Directory.EnumerateFiles("/ftdata/projecthub/", "*.json", SearchOption.AllDirectories)) {
                    if (i >= 10) { break; }
                        
                    try
                    {
                        projectList[i] = JsonConvert.DeserializeObject<Project>(System.IO.File.ReadAllText(projectFileList[i]));
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
