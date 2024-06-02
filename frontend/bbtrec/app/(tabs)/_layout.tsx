import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

/**
 * Renders the layout for the tab navigation.
 * @returns {JSX.Element} The tab layout component.
 */
export default function TabLayout() {
  // Retrieve the current color scheme (light or dark)
  const colorScheme = useColorScheme();

  return (
    // Configure the tab navigation with specific screen options
    <Tabs
      screenOptions={{
        // Set the active tab tint color based on the color scheme
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Hide the header for all tab screens
        headerShown: false,
      }}>
      {/* Define the "Home" tab screen */}
      <Tabs.Screen
        name="index"
        options={{
          // Set the title for the "Home" tab
          title: 'Home',
          // Configure the tab icon based on whether the tab is focused
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      {/* Define the "Explore" tab screen */}
      <Tabs.Screen
        name="explore"
        options={{
          // Set the title for the "Explore" tab
          title: 'Explore',
          // Configure the tab icon based on whether the tab is focused
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
