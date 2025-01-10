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
        [HttpPost("scan")]
        public async Task<IActionResult> Scan()
        {
            try
            {
                var apiKey = Environment.GetEnvironmentVariable("OPENAI_KEY");
                if (string.IsNullOrEmpty(apiKey)) { throw new NullReferenceException("Environment Variable OPENAI_KEY Was null"); }

                var chatClient = new ChatClient("gpt-4o-mini", apiKey: apiKey);

                var textContentPart = ChatMessageContentPart.CreateTextPart("Your goal is to analyze the image and extract the code from it. The code is in html. Send only the extracted code plain text without any additional comments or markdown just the code and without 'formatted code:' make sure to add indents, otherwise your goal has not been achieved. Make sure to do it as is. Only errors fix should be indentations");
                var imageContentPart = ChatMessageContentPart.CreateImagePart(new Uri("https://github.com/TeamFractalTree/Docs/blob/main/TestImage2.png?raw=true"), ChatImageDetailLevel.Low);
                var chatMessage = new UserChatMessage(textContentPart, imageContentPart);

                var result = await chatClient.CompleteChatAsync(chatMessage);
                var content = result.Value.Content[0].Text;

                Response.Headers.Append("X-Tokens-Used", result.Value.Usage.TotalTokenCount.ToString());

                return Ok(content);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
