import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

/**
 * Renders the "Not Found" screen for handling 404 errors.
 * @returns {JSX.Element} The "Not Found" screen component.
 */
export default function NotFoundScreen() {
  return (
    <>
      {/* Set the screen title to "Oops!" */}
      <Stack.Screen options={{ title: 'Oops!' }} />
      {/* Main container with themed view */}
      <ThemedView style={styles.container}>
        {/* Display message indicating the screen doesn't exist */}
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        {/* Link to navigate back to the home screen */}
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

// Styles for the "Not Found" screen components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
