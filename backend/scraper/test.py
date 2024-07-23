import google.generativeai as genai
import requests
import instructor
from typing import List, Optional
from pydantic import BaseModel, HttpUrl, Field
from enum import Enum

'''
TODO:
- Convert LLM scraper into a function
- Make API Routes:
    -> GET request for menu: menu link -> write menu to DB
        -> Write to DB

- Host on Modal
'''


############################################################################
GOOGLE_API_KEY =  'nice_try_stealing_my_api_key'
GOOGLE_API_KEY =  ''
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')
############################################################################

############################################################################
site = 'https://xingfutang.com/menu'
response = requests.get(site)
raw_html = response.text

# return_menu_instruction = "given the following raw html of a webpage that is a menu for a bubble tea store, output only a list of drinks and their associated descriptions:\n"
# return_menu_drinks = "given the following raw html of a webpage that is a menu for a bubble tea store, output only a list of drinks, as well as the link to the image associated to that drink"
# response = model.generate_content(return_menu_drinks + raw_html)
# print(response.text)
############################################################################


############################################################################
# defining the base model of a menu
class BaseType(str, Enum):
    milk_tea = 'milk tea'
    fruit_tea = 'fruit tea'
    smoothie = 'smoothie'
    slush = 'slush'
    latte = 'latte'

class TeaType(str, Enum):
    black_tea = 'black tea'
    green_tea = 'green tea'
    oolong_tea = 'oolong tea'
    white_tea = 'white tea'
    herbal_tea = 'herbal tea'

class Flavor(str, Enum):
    classic = 'classic'
    fruity = 'fruity'
    floral = 'floral'
    nutty = 'nutty'
    spiced = 'spiced'

class SweetnessLevel(str, Enum):
    less_sweet = 'less sweet'
    regular_sweet = 'regular sweet'
    more_sweet = 'more sweet'

class Topping(str, Enum):
    tapioca_pearls = 'tapioca pearls'
    popping_pearls = 'popping pearls'
    jelly = 'jelly'
    pudding = 'pudding'
    cheese_foam = 'cheese foam'
    whipped_cream = 'whipped cream'

class Temperature(str, Enum):
    hot = 'hot'
    cold = 'cold'

class Drink(BaseModel):
    name: str
    image_link: HttpUrl
    base_type: BaseType
    tea_type: Optional[TeaType] = None
    flavor: Flavor
    sweetness_level: SweetnessLevel
    included_toppings: List[Topping]
    temperature: Temperature

class Menu(BaseModel):
    drinks: List[Drink]
############################################################################


############################################################################
#testing gemini menu breakdown via basemodel
# Initialize the Gemini client
client = instructor.from_gemini(
    client=genai.GenerativeModel(
        model_name="models/gemini-1.5-flash-latest",
    ),
    mode=instructor.Mode.GEMINI_JSON,
)
# Example menu string (you would replace this with your actual menu string)
menu_string = """
1. Classic Milk Tea:
   - Image link: https://example.com/classic_milk_tea.jpg
   - Base type: milk tea
   - Tea type: black tea
   - Flavor: classic
   - Sweetness level: regular sweet
   - Included toppings: tapioca pearls, cheese foam
   - Temperature: cold

2. Mango Smoothie:
   - Image link: https://example.com/mango_smoothie.jpg
   - Base type: smoothie
   - Flavor: fruity
   - Sweetness level: less sweet
   - Included toppings: jelly
   - Temperature: cold
"""

# Create the prompt and request
resp = client.messages.create(
    messages=[
        {
            "role": "user",
            "content": f"Extract all the drinks information from the following menu:\n{raw_html}",
        }
    ],
    response_model=Menu,
)

# Validate the response
assert isinstance(resp, Menu)
for drink in resp.drinks:
    print(f"Name: {drink.name}")
    print(f"Image Link: {drink.image_link}")
    print(f"Base Type: {drink.base_type}")
    print(f"Tea Type: {drink.tea_type}")
    print(f"Flavor: {drink.flavor}")
    print(f"Sweetness Level: {drink.sweetness_level}")
    print(f"Included Toppings: {drink.included_toppings}")
    print(f"Temperature: {drink.temperature}")
    print()
############################################################################
