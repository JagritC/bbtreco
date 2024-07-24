import json

with open("./Chatimemenu.json", "r") as f:
    data = json.load(f)

print(type(data["drinks"]))


def add_drink_id(drinks):
    for index, drink in enumerate(drinks):
        drink["drink_id"] = index + 1
    return data


updated_drinks = add_drink_id(data["drinks"])

updated_json = {"drinks": updated_drinks}

with open("Chatimemenu.json", "w") as f:
    json.dump(updated_json, f, indent=2)
