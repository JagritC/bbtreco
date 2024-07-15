import { View, Text, TextInput, Image, Touchable, TouchableOpacity, FlatList, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import Categories from "../components/categories";
import { stores } from "../constants";

export default function HomeScreen() {
	return (
		<View className="bg-white flex-1 relative">
			<StatusBar />
			<Image source={require("../assets/images/white-boba.png")} className="w-full absolute opacity-10" style={{ width: 500, height: 220 }} />
			<SafeAreaView className="flex-1 border ">
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
							<Text className="text-base bg-white font-semibold ">Waterloo, ON</Text>
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

				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
					<View className="mt-4">
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
				</ScrollView>
			</SafeAreaView>
			{/*categories */}
		</View>
	);
}
