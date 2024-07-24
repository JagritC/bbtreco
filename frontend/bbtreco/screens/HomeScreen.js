import { View, Text, TextInput, Image, Touchable, TouchableOpacity, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import * as Location from "expo-location";
import { themeColors } from "../theme";
import Categories from "../components/categories";
import { stores } from "../constants";
import { useNavigation } from "@react-navigation/native";
//require("dotenv").config();

export default function HomeScreen({ navigation, route }) {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [city, setCity] = useState(null);
	const [userPreferences, setUserpreferences] = useState(null);
	const [bobaStores, setBobaStores] = useState([]);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);

			let reverseGeocode = await Location.reverseGeocodeAsync({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			});

			if (reverseGeocode.length > 0) {
				let place = reverseGeocode[0];
				setCity(`${place.city}, ${place.region}`);
			}
			fetchBobaStores(location.coords.latitude, location.coords.longitude);
			console.log(bobaStores);
		})();

		if (route.params?.userPreferences) {
			setUserpreferences(route.params.userPreferences);
			console.log(route.params.userPreferences);
		}
	}, [route.params?.userPreferences]);

	let locationText = "Waiting..";
	if (errorMsg) {
		locationText = errorMsg;
	} else if (location) {
		locationText = city;
	}

	const fetchBobaStores = async (lat, long) => {
		// map the store names from stores into a list of store names
		let storeNames = stores.map((store) => store.name);
		setBobaStores(storeNames);
	};

	return (
		<View className="bg-white flex-1 relative">
			<Image source={require("../assets/images/white-boba.png")} className="w-full absolute opacity-10" style={{ width: 500, height: 200 }} />
			<SafeAreaView className="flex-1">
				<View className="mt-5 mb-5 items-center flex-row px-4 justify-between">
					{/*profile icon */}
					<TouchableOpacity>
						<View style={{ backgroundColor: themeColors.primary(1) }} className="p-2 rounded-full">
							<Icon.User color={themeColors.dark(1)} height="20" width="20" />
						</View>
					</TouchableOpacity>

					{/*location */}
					<TouchableOpacity>
						<View className="flex-row items-center space-x-2">
							<Icon.MapPin height="20" width="20" color={themeColors.secondary(1)} />
							<Text className="text-base font-semibold ">{locationText}</Text>
						</View>
					</TouchableOpacity>
					{/*settings*/}
					<TouchableOpacity>
						<View className="flex-row p-2">
							<Icon.Settings color={themeColors.tertiary(1)} height="20" width="20" />
						</View>
					</TouchableOpacity>
				</View>
				{/*search bar */}
				<View className="p-2 flex-row items-center space-x-2 px-4 pb-2">
					<View className="bg-white flex-row flex-1 rounded-full border border-gray-300 p-2 rounded-full items-center w-full">
						<Icon.Search height="25" stroke="gray" />
						<TextInput placeholder="Search" className="ml-1 flex-1" />
					</View>

					{/*filter icon */}
					<TouchableOpacity>
						<View style={{ backgroundColor: themeColors.secondary(1) }} className="p-3 rounded-full">
							<Icon.Sliders height="20" width="20" strokeWidth={2.5} stroke="white" />
						</View>
					</TouchableOpacity>
				</View>
				{/* Fill Questionnaire button */}
				<View className="mt-8 flex-row items-center px-4">
					<Image
						source={require("../assets/images/white-boba.png")}
						className="w-full absolute opacity-10"
						style={{ width: 500, height: 100 }}
					/>
					<TouchableOpacity
						className="bg-white p-2 flex-row items-center space-x-2 rounded-full border border-gray-300 w-full"
						onPress={() => navigation.navigate("Questionnaire")}>
						<Icon.Edit height="20" width="20" color={themeColors.primary(1)} />
						<Text className="text-base font-semibold text-black">Fill Questionnaire</Text>
					</TouchableOpacity>
				</View>

				{/*get Recommendation Button*/}
				<View className="mt-5 flex-row items-center px-4">
					<Image
						source={require("../assets/images/white-boba.png")}
						className="w-full absolute opacity-10"
						style={{ width: 500, height: 50 }}
					/>
					<TouchableOpacity
						className="bg-white p-2 flex-row items-center space-x-2 rounded-full border border-gray-300 w-full"
						onPress={() =>
							navigation.navigate("GetRecommendation", {
								userPreferences: userPreferences,
							})
						}>
						<Icon.Star height="20" width="20" color={themeColors.primary(1)} />
						<Text className="text-base font-semibold text-black">Get Recommendation</Text>
					</TouchableOpacity>
				</View>
				<Image source={require("../assets/images/white-boba.png")} className="w-full opacity-10" style={{ width: 500, height: 200 }} />
				<Image source={require("../assets/images/white-boba.png")} className="w-full opacity-10" style={{ width: 500, height: 200 }} />
				<Image source={require("../assets/images/white-boba.png")} className="w-full opacity-10" style={{ width: 500, height: 200 }} />
				{/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }} className="overflow-auto mt-1">
					<View className="-mt-2 -ml-2">
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							className="overflow-visible"
							contentContainerStyle={{ paddingHorizontal: 20 }}>
							{stores.map((store, index) => {
								return (
									<View key={index} className="px-2 mt-2">
										<TouchableOpacity
											className="p-4 rounded-full shadow"
											style={{ backgroundColor: themeColors.primary(1) }}>
											<Text>{store.name}</Text>
										</TouchableOpacity>
									</View>
								);
							})}
						</ScrollView>
					</View>
				</ScrollView> */}
			</SafeAreaView>
		</View>
	);
}
