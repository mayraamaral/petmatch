import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/features/auth/context/auth.context";

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href="/find-pet" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="confirm-email" />
    </Stack>
  );
}
