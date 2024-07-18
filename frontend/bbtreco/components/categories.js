import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { stores } from "../constants";
import { themeColors } from "../theme";

export default function Categories() {
	return (
		<View className="mt-4">
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				className="overflow-visible"
				contentContainerStyle={{ paddingHorizontal: 20 }}>
				{stores.map((store, index) => {
					return (
						<View key={index} className="px-5 mt-6">
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
	);
}
