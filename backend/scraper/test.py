import google.generativeai as genai
import requests
import os
from dotenv import load_dotenv
from bs4 import BeautifulSoup


load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_GEMINI_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel(
    "gemini-1.5-flash", generation_config={"response_mime_type": "application/json"}
)

site = "https://chatime.ca/menu/"
response = requests.get(site)
raw_html_bytes = response.content

soup = BeautifulSoup(raw_html_bytes, "html.parser")

print("soup's type", type(soup.prettify()))

prompt = (
    """
Given the following raw html of a webpage that is a menu for a bubble tea store, Using the this JSON schema:
{
    "drink_name": "string",
    "drink_description": "string",
    "image_link": "string"
}
Return the drinks, their associated descriptions, and a link to their image in JSON format. \n
"""
    + soup.prettify()
)

response = model.generate_content(prompt)

print(response.text)
# extract the txt into json file, with drink name, drink description and image link

# write the json file
with open("chatime_menu.json", "w") as f:
    f.write(response.text)
