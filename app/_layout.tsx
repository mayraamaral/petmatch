import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik';
import { WalterTurncoat_400Regular } from '@expo-google-fonts/walter-turncoat';

import StorybookUIRoot from '../.rnstorybook';
import { useColorScheme } from '@/hooks/use-color-scheme';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isStorybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    RubikRegular: Rubik_400Regular,
    RubikMedium: Rubik_500Medium,
    RubikSemiBold: Rubik_600SemiBold,
    RubikBold: Rubik_700Bold,
    WalterTurncoat: WalterTurncoat_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (isStorybookEnabled) {
    return <StorybookUIRoot />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
