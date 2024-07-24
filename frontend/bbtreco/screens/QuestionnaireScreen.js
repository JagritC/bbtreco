import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { StatusBar } from "expo-status-bar";
import Slider from "@react-native-community/slider";
import * as Icon from "react-native-feather";

export default function QuestionnaireScreen({ navigation }) {
	const [userPreferences, setUserpreferences] = useState({
		milky: true,
		fruity: false,
		withTea: false,
		distance: 0,
		refreshing: false,
		fragrant: false,
		cold: false,
		// Add other fields as necessary
	});

	const handleSelection = (field, value) => {
		setUserpreferences({
			...userPreferences,
			[field]: value,
		});
	};

	const handleToggle = (field) => {
		setUserpreferences((prevAnswers) => ({
			...prevAnswers,
			[field]: !prevAnswers[field],
		}));
	};

	const handleSubmit = () => {
		// Navigate back to Home or another screen
		navigation.navigate("Home", { userPreferences });
	};

	return (
		<SafeAreaView>
			<View className="relative">
				{/* Title */}
				<View className="bg-primary p-4">
					<Text className="text-dark text-center text-lg font-bold">Questionnaire</Text>
				</View>
				{/* back button */}
				<TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-3.5 left-4 mt-0.5">
					<Icon.ArrowLeft color={themeColors.dark(1)} height="30" width="30" />
				</TouchableOpacity>
			</View>

			{/* Your questionnaire form */}
			<ScrollView contentContainerStyle={{ padding: 20 }}>
				<View>
					<Text className="text-lg font-bold mb-3">What kind of boba are you interested in today?</Text>
					<TouchableOpacity
						className={`p-3 bg-gray-200 rounded mb-3 ${userPreferences.milky ? "bg-primary" : "bg-gray-200"}`}
						onPress={() => {
							handleToggle("milky");
							if (userPreferences.fruity) {
								handleToggle("fruity");
							}
						}}>
						<Text className="text-base">Milky</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className={`p-3 bg-gray-200 rounded mb-3 ${userPreferences.fruity ? "bg-primary" : "bg-gray-200"}`}
						onPress={() => {
							handleToggle("fruity");
							if (userPreferences.milky) {
								handleToggle("milky");
							}
						}}>
						<Text className="text-base">Fruity</Text>
					</TouchableOpacity>
				</View>
				<View>
					<Text className="text-lg font-bold mb-3">Would you like tea in your boba?</Text>
					<TouchableOpacity
						className={`p-3 bg-gray-200 rounded mb-3 ${userPreferences.withTea ? "bg-primary" : "bg-gray-200"}`}
						onPress={() => {
							if (!userPreferences.withTea) {
								handleToggle("withTea");
							}
						}}>
						<Text className="text-base">Yes</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className={`p-3 bg-gray-200 rounded mb-3 ${!userPreferences.withTea ? "bg-primary" : "bg-gray-200"}`}
						onPress={() => {
							if (userPreferences.withTea) {
								handleToggle("withTea");
							}
						}}>
						<Text className="text-base">No</Text>
					</TouchableOpacity>
				</View>
				<View>
					<Text className="text-lg font-bold mb-3">How far are you willing to travel?</Text>
					{/* number line or slider */}
					<Slider
						minimumValue={0}
						maximumValue={5}
						step={0.1}
						value={userPreferences.distance}
						onValueChange={(value) => handleSelection("distance", Math.round(value * 100) / 100)}
						showsDefault={false}
						minimumTrackTintColor={themeColors.secondary(1)}
						tapToSeek={true}
					/>
					<Text className="text-base text-center mb-2">{Math.round(userPreferences.distance * 100) / 100} km</Text>
				</View>
				<View>
					<Text className="text-lg font-bold mb-3">Would you like your drink to be...?</Text>
					<TouchableOpacity
						className={`p-3 bg-gray-200 rounded mb-3 ${userPreferences.refreshing ? "bg-primary" : "bg-gray-200"}`}
						onPress={() => handleToggle("refreshing")}>
						<Text className="text-base">Refreshing</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className={`p-3 bg-gray-200 rounded mb-3 ${userPreferences.fragrant ? "bg-primary" : "bg-gray-200"}`}
						onPress={() => handleToggle("fragrant")}>
						<Text className="text-base">Fragrant</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className={`p-3 bg-gray-200 rounded mb-3 ${userPreferences.cold ? "bg-primary" : "bg-gray-200"}`}
						onPress={() => handleToggle("cold")}>
						<Text className="text-base">Cold</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity className="bg-secondary p-3 rounded mt-5 mb-10" onPress={handleSubmit}>
					<Text className="text-base text-white text-center">Submit</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}
