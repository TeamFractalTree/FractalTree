using Microsoft.AspNetCore.Mvc;
using OpenAI;
using OpenAI.Assistants;
using OpenAI.Chat;
using OpenAI.Files;
using System.ClientModel;
using System.Diagnostics;

#pragma warning disable OPENAI001 

namespace FractalTree.Backend.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class AndrondSigningController : ControllerBase
    {
        [HttpOptions("sign")]
        public void FixCors() { Response.Headers.Append("Access-Control-Allow-Origin", "*"); }

        [HttpPost("sign")]
        [DisableRequestSizeLimit]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Sign(List<IFormFile> apk)
        {
            try
            {
                // Save The File From The Body
                var apkID = Guid.NewGuid().ToString() + ".apk";
                var newFilePath = "/home/app/scans/" + apkID;

                if (apk.Count != 1) { throw new ArgumentException("Too Many Files Were Uploaded"); }
                var file = apk[0];
                if (file.Length == 0) { throw new ArgumentException("Empty File"); }

                var fileOnDisk = System.IO.File.OpenWrite(newFilePath);
                file.CopyTo(fileOnDisk);
                fileOnDisk.Close();

                // Sign the file
                await Process.Start("java", "-jar /app/Content/apksigner.jar sign --ks-pass pass:runtime --ks-key-alias app --ks /app/Content/runtime.keystore " + newFilePath).WaitForExitAsync();

                Response.Headers.Append("Access-Control-Allow-Origin", "*");

                return Ok(apkID);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("sign")]
        public async Task<IActionResult> DownloadSignedAPK([FromQuery] string apkID)
        {
            Response.Headers.Append("Access-Control-Allow-Origin", "*");
            var scanPath = Path.Join("/home/app/scans/", apkID);

            if (!System.IO.File.Exists(scanPath))
            {
                return NotFound();
            }

            return File(new FileStream(scanPath, FileMode.Open), "application/vnd.android.package-archive");
        }
    }
}
