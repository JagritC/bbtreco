import axios from "axios";
//dotenv
require("dotenv").config();
import fs from "fs";

const AzureFunctionUrl = "https://bobafy-endpoint07212348548964.eastus2.inference.ml.azure.com/score";
const azure_api_key = process.env.AZURE_API_KEY;

const requestHeaders = new Headers({
	"Content-Type": "application/json",
	"x-functions-key": azure_api_key,
});

const jsonData = fs.readFileSync("Chatimemenu.json", "utf8");
const parsedData = JSON.parse(jsonData);

const transformData = (data) => {
	return data.drinks.map((drink, index) => ({
		drink_id: index + 1,
		fruity_drink: Number(drink.fruity),
		milky_drink: Number(drink.milk),
		with_tea_drink: Number(drink.withTea),
		refreshing_drink: Number(drink.refreshing),
		fragrant_drink: Number(drink.fragrant),
		cold_drink: Number(drink.cold),
		distance: Number(drink.distance),
		popularity: Number(drink.popularity),
	}));
};

const transformedData = transformData(parsedData);

export const getRecommendation = async (userPreferences) => {
	try {
		const response = await axios.post(
			AzureFunctionUrl,
			{
				userPreferences: userPreferences,
				drinksList: drinksList,
			},
			{
				headers: {
					"Content-Type": "application/json",
					"x-functions-key": azure_api_key,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
