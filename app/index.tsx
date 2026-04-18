import LogoSvg from "@/assets/images/logo.svg";
import { LogoWordmark } from "@/components/ui/logo-wordmark";
import { tokens } from "@/constants/tokens";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <LogoSvg width={120} height={120} color={tokens.colors.brand.green} />
      <LogoWordmark size="md" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing[4],
    backgroundColor: tokens.colors.white,
  },
});
