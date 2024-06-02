import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/**
 * Root layout component that sets up theme and navigation stack.
 * @returns {JSX.Element | null} The root layout component or null if fonts are not loaded.
 */
export default function RootLayout() {
  // Get the current color scheme (light or dark)
  const colorScheme = useColorScheme();
  
  // Load custom fonts
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Return null if fonts are not yet loaded
  if (!loaded) {
    return null;
  }

  return (
    // Set the theme based on the color scheme and provide the navigation stack
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Define the main tabs screen without a header */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Define the not-found screen */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
