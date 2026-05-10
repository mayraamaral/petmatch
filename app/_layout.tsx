import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, type ReactNode } from 'react';
import { AppState } from 'react-native';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { WalterTurncoat_400Regular } from '@expo-google-fonts/walter-turncoat';

import StorybookUIRoot from '../.rnstorybook';
import { SplashLoader } from '@/components/ui/splash-loader';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/features/auth/context/auth.context';
import { supabase } from '@/lib/supabase';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isStorybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    QuicksandRegular: Quicksand_400Regular,
    QuicksandMedium: Quicksand_500Medium,
    QuicksandSemiBold: Quicksand_600SemiBold,
    QuicksandBold: Quicksand_700Bold,
    WalterTurncoatRegular: WalterTurncoat_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (!loaded) {
    return null;
  }

  if (isStorybookEnabled) {
    return <StorybookUIRoot />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <AuthGate>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(app)" />
            </Stack>
          </AuthGate>
        </AuthProvider>
        <StatusBar style="dark" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function AuthGate({ children }: { children: ReactNode }) {
  const { isBootstrapping } = useAuth();
  if (isBootstrapping) {
    return <SplashLoader />;
  }
  return <>{children}</>;
}
