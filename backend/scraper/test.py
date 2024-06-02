import google.generativeai as genai
import requests

GOOGLE_API_KEY =  'nice_try_stealing_my_api_key'
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash')

site = 'https://xingfutang.com/menu'
response = requests.get(site)
raw_html = response.text

response = model.generate_content("given the following raw html of a webpage that is a menu for a bubble tea store, output only a list of drinks and their associated descriptions:\n" + raw_html)
print(response.text)