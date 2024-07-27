import json

# Path to the input and output files
input_file_path = "./Chatimemenu.json"
output_file_path = "FormattedChatimemenu.json"

# Load the JSON string from the file
with open(input_file_path, "r") as file:
    json_string = file.read()

# Parse the JSON string into a Python dictionary
try:
    data = json.loads(json_string)
except json.JSONDecodeError as e:
    print(f"Error decoding JSON: {e}")
    data = None

if data:
    # Write the parsed JSON data back to a new file with proper formatting
    try:
        with open(output_file_path, "w") as file:
            json.dump(data, file, indent=2)
        print("Formatted JSON file has been written.")
    except IOError as e:
        print(f"Error writing to file: {e}")
else:
    print("Error: Failed to parse the JSON data.")
