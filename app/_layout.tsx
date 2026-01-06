import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';
import * as Updates from 'expo-updates';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://6edaf389526a8ca90e75f97ffaa64f5d@o4510146879684608.ingest.de.sentry.io/4510526936973392',

  // Enable debug mode to see Sentry logs in console
  debug: __DEV__,

  // Send events even in development
  enabled: true,

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Set tracesSampleRate to capture performance data
  tracesSampleRate: 1.0,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export const unstable_settings = {
  anchor: '(tabs)',
};

export default Sentry.wrap(function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function checkForUpdates() {
      if (__DEV__) {
        return; // Skip updates check in development
      }

      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (err) {
        console.error('Error checking for updates:', err);
        Sentry.captureException(err, {
          tags: { feature: 'ota-updates', action: 'checkForUpdates' },
        });
      }
    }

    checkForUpdates();
  }, []);

  return (
    <FavoritesProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name="place-detail/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="culture-detail/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="food-detail/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="map-view" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </FavoritesProvider>
  );
});