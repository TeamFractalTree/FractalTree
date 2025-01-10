using Microsoft.AspNetCore.Mvc;
using OpenAI;
using OpenAI.Assistants;
using OpenAI.Chat;
using OpenAI.Files;
using System.ClientModel;

#pragma warning disable OPENAI001 

namespace FractalTree.Backend.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class ScanningController : ControllerBase
    {
        [HttpOptions("scan")]
        public void FixCors() { Response.Headers.Append("Access-Control-Allow-Origin", "*"); }

        [HttpPost("scan")]
        [DisableRequestSizeLimit]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Scan(List<IFormFile> image)
        {
            try
            {
                // Save The File From The Body
                var scanID = Guid.NewGuid().ToString() + ".png";
                var newFilePath = "/home/app/scans/" + scanID;

                if (image.Count != 1) { throw new ArgumentException("Too Many Files Were Uploaded"); }
                var file = image[0];
                if (file.Length == 0) { throw new ArgumentException("Empty File"); }

                var fileOnDisk = System.IO.File.OpenWrite(newFilePath);
                file.CopyTo(fileOnDisk);
                fileOnDisk.Close();

                var apiKey = Environment.GetEnvironmentVariable("OPENAI_KEY");
                if (string.IsNullOrEmpty(apiKey)) { throw new NullReferenceException("Environment Variable OPENAI_KEY Was null"); }

                var chatClient = new ChatClient("gpt-4o-mini", apiKey: apiKey);

                var textContentPart = ChatMessageContentPart.CreateTextPart("Your goal is to analyze the image and extract the code from it. The code is in html. Send only the extracted code plain text without any additional comments or markdown just the code and without 'formatted code:' make sure to add indents, otherwise your goal has not been achieved. Make sure to do it as is. Only errors fix should be indentations");
                var imageContentPart = ChatMessageContentPart.CreateImagePart(new Uri("https://node.samsidparty.com/api/scan?scanID=" + scanID), ChatImageDetailLevel.Low);
                var chatMessage = new UserChatMessage(textContentPart, imageContentPart);

                var result = await chatClient.CompleteChatAsync(chatMessage);
                var content = result.Value.Content[0].Text;

                Response.Headers.Append("X-Tokens-Used", result.Value.Usage.TotalTokenCount.ToString());
                Response.Headers.Append("X-Scan-ID", scanID);
                Response.Headers.Append("Access-Control-Allow-Origin", "*");

                return Ok(content);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
