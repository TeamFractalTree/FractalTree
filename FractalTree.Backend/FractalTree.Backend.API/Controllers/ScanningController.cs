﻿using Microsoft.AspNetCore.Mvc;
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

                var chatClient = new ChatClient("gpt-4o", apiKey: apiKey);

                var textContentPart = ChatMessageContentPart.CreateTextPart("Your goal is to analyze the image and extract the code from it. The code may be in any programming language. You may attempt to correct syntax errors but do not correct any functional errors under any circumstances. Return only the extracted code and nothing else, do not add any markdown, backticks, or any formatting except for indentations. If you are unable to achieve your goal, simply return the word \"error\" without any additional context");
                var imageContentPart = ChatMessageContentPart.CreateImagePart(new Uri("https://api.fractal-tree.org/api/dscan?scanID=" + scanID), ChatImageDetailLevel.Low);
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
