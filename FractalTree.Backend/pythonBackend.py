from openai import OpenAI
from PIL import Image
import os
from dotenv import load_dotenv


load_dotenv()


openai_KEY = os.getenv("OPENAI_API_KEY")


def extractImage(url, openai_api_key):
    client = OpenAI(api_key=openai_api_key)
    try:
        print("Making API request...") 
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Your goal is to analyze the image and extract the code from it. The code is in javascript. Send only the extracted code plain text without any additional comments or markdown just the code and without 'formatted code:' make sure to add indents, otherwise your goal has not been achieved. Make sure to do it as is. Only errors fix should be indentations"},
                        {
                            "type": "image_url",
                            "image_url": {"url": url}
                        }
                    ]
                }
            ],
            max_tokens=80
        )
        code = response.choices[0].message.content
        print("API request successful.")  
        return code
    except Exception as e:
        print(f"An error occurred: {e}") 
        return None

if __name__ == "__main__":
    print(openai_KEY)
    url = "https://node.samsidparty.com/Images/TestImage.png"
    code = extractImage(url, openai_KEY)
    if code:
        print("Extracted Code:")
        print(code)
    else:
        print("Failed to extract code.")
