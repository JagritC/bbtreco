import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import React from "react";

import HomeScreen from "./screens/HomeScreen";
import QuestionnaireScreen from "./screens/QuestionnaireScreen";
import GetRecommendationScreen from "./screens/GetRecommendationScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="GetRecommendation" component={GetRecommendationScreen} />
				<Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
