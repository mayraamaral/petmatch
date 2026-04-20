import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/features/auth/context/auth.context";

export default function AppLayout() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="find-pet" />
    </Stack>
  );
}
