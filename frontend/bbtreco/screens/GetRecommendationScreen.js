import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import drinks from "../constants/drinks";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });

// const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function GetRecommendationScreen({ navigation, route }) {
	const [recommendation, setRecommendation] = useState([]);
	const [chatHistory, setChatHistory] = useState([]);
	const [userMessage, setUserMessage] = useState("");
	const [message, setMessage] = useState("");
	const azure_api = process.env.EXPO_PUBLIC_AZURE_API_KEY;

	useEffect(() => {
		getRecommendation();
	}, []);

	const getRecommendation = async () => {
		const { userPreferences } = route.params;
		const userPrefs = {
			user_id: userPreferences.userId,
			fruity_user: userPreferences.fruity_user ? 1 : 0,
			milky_user: userPreferences.milky ? 1 : 0,
			with_tea_user: userPreferences.withTea ? 1 : 0,
			refreshing_user: userPreferences.refreshing ? 1 : 0,
			fragrant_user: userPreferences.fragrant ? 1 : 0,
			adventurous_user: userPreferences.adventurous ? 1 : 0,
			cold_user: userPreferences.cold ? 1 : 0,
		};

		const availableDrinks = drinks.drinks.map((drink) => ({
			drink_id: drink.drink_id,
			fruity_drink: drink.fruity,
			milky_drink: drink.milk,
			with_tea_drink: drink.withTea,
			refreshing_drink: drink.refreshing,
			fragrant_drink: drink.fragrance,
			cold_drink: drink.cold,
			distance: drink.distance,
			popularity: drink.popularity,
		}));

		const requestBody = {
			user_preferences: [userPrefs],
			available_bubble_teas: availableDrinks,
		};

		try {
			const response = await fetch("https://bobafy-endpoint07212348548964.eastus2.inference.ml.azure.com/score", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${azure_api}`,
					"azureml-model-deployment": "blue",
				},
				body: JSON.stringify(requestBody),
			});

			const result = await response.json();
			const recommendedDrinkId = result[0].drink_id;
			const recommendedDrink = drinks.drinks.find((drink) => drink.drink_id === recommendedDrinkId);

			const drinkNames = drinks.drinks.map((drink) => drink.drink_name);

			if (recommendedDrink) {
				setRecommendation(recommendedDrink);
				setChatHistory([
					{
						_id: 1,
						text: `You are a bot called Bobabot. You are to help me choose a boba drink. The first recommendation we start with is ${recommendedDrink.drink_name}. My preferences are ${userPreferences}. The drinks in my area are ${drinkNames}.`,
						createdAt: new Date(),
						user: "system",
					},
					{
						id: 2,
						text: `Welcome to Bobafy! I'm BobaBot, your friendly bubble tea assistant. How can I help you today? For starters, Our algorithm has recommended the ${recommendedDrink.drink_name} for you!`,
						user: "assistant",
						createdAt: new Date(),
					},
				]);
			} else {
				setMessage("No recommendations found");
			}
		} catch (error) {
			console.error("Error fetching recommendations", error);
			setMessage("Error fetching recommendations");
		}
	};

	const handleSendMessage = async () => {
		if (userMessage.trim() === "") return;

		const newMessage = {
			id: chatHistory.length + 1,
			text: userMessage,
			user: "You",
			createdAt: new Date(),
		};

		setChatHistory((prevHistory) => [...prevHistory, newMessage]);
		setUserMessage("");

		try {
			const formattedHistory = chatHistory.map((msg) => ({
				role: msg.user === "You" ? "user" : "assistant",
				content: msg.text,
			}));

			const completion = await openai.chat.completions.create({
				messages: formattedHistory,
				model: "gpt-4o-mini",
			});

			const botMessage = {
				id: chatHistory.length + 2,
				text: completion.choices[0].message.content,
				user: "Bobabot",
				createdAt: new Date(),
			};

			setChatHistory((prevHistory) => [...prevHistory, botMessage]);
		} catch (error) {
			console.error("Error generating response", error);
			setMessage("Error generating response");
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="mt-5 mb-5 items-center flex-row px-4 justify-between">
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Icon.ArrowLeft color={themeColors.dark(1)} height="30" width="30" />
				</TouchableOpacity>
				<Text className="text-lg font-semibold">Recommendations</Text>
				<View style={{ width: 20 }} />
			</View>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View className="px-8">
					{recommendation ? (
						<View className="mt-5 items-center">
							<Image source={{ uri: recommendation.image_link }} style={{ width: 250, height: 314 }} />
							<Text className="text-lg font-semibold mt-5">{recommendation.drink_name}</Text>
							<Text className="text-base mt-2">Popularity score: {recommendation.popularity}</Text>
							<Text className="text-base mt-2">Distance from you: {recommendation.distance}km</Text>
						</View>
					) : (
						<Text className="text-lg font-semibold">{message}</Text>
					)}
				</View>
				<View className="mt-4" style={{ flex: 1 }}>
					<ScrollView>
						{chatHistory.slice(1).map((msg) => (
							<View
								key={msg.id}
								className="ml-2 rounded-lg opacity-80"
								style={{
									maxWidth: "75%",
									alignSelf: msg.user === "You" ? "flex-end" : "flex-start",
									backgroundColor: msg.user === "You" ? themeColors.primary(1) : themeColors.secondary(1),
									borderRadius: 10,
									padding: 10,
									marginVertical: 5,
								}}>
								<Text className={`${msg.user === "You" ? "text-white" : "text-black"}`}>{msg.text}</Text>
							</View>
						))}
					</ScrollView>
				</View>
			</ScrollView>
			<View className="flex-row p-1 -mb-1" style={{ borderTopColor: themeColors.dark(0.1) }}>
				<TextInput
					style={{
						flex: 1,
						padding: 10,
						borderWidth: 1,
						borderColor: themeColors.dark(0.1),
						borderRadius: 10,
						marginRight: 10,
					}}
					placeholder="Type a message..."
					value={userMessage}
					onChangeText={setUserMessage}
				/>
				<Button title="Send" onPress={handleSendMessage} />
			</View>
		</SafeAreaView>
	);
}
