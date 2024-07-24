import google.generativeai as genai
import requests
from bs4 import BeautifulSoup

# dotenv
from dotenv import load_dotenv
import os

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_GEMINI_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")

site = "https://chatime.ca/menu/"
response = requests.get(site)

soup = BeautifulSoup(response.text, "html.parser")

text = soup.prettify()

model = genai.GenerativeModel(
    "gemini-1.5-flash", generation_config={"response_mime_type": "application/json"}
)

prompt = (
    """given the following raw html of a webpage that is a menu for a bubble tea store, output only a list of drinks Using this JSON schema, make the booleans either a 1 or 0:
    {
        "drinks": [
            {
                "drink_id": "number",
                "drink_name": "string",
                "cold": "boolean",
                "fragrance": "boolean",
                "fruity": "boolean",
                "milk": "boolean",
                "refreshing": "boolean",
                "withTea": "boolean",
                "distance": "number, give any float between 0 and 5",
                "popularity": "number out of 100"
                "image_link": "string"
            }
        ]
    }
    make sure to keep a clean format and dont add any extra text or characters, just the list of drinks.
\n"""
    + text
)

response = model.generate_content(prompt)

# write to a json file
import json

with open("Chatimemenu.json", "w") as f:
    json.dump(response.text, f)
