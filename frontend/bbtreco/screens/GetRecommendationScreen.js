import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
//import getRecommendation from "../api/getRecommendation";

export default function GetRecommendationScreen({ navigation, route }) {
	const [recommendation, setRecommendation] = useState([]);
	const [message, setMessage] = useState([]);
	const [inputText, setInputText] = useState("");

	const handleSend = async () => {
		if (inputText.trim() === "") {
			return;
		}

		const newMessage = {
			id: message.length + 1,
			text: inputText,
			sender: "user",
		};

		setMessage([...message, newMessage]);
		setInputText("");

		try {
			const response = await getRecommendation(inputText);
		} catch {
			console.error(error);
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
		</SafeAreaView>
	);
}
