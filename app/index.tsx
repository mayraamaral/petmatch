import { StyleSheet, View } from "react-native";
import LogoSvg from "@/assets/images/logo.svg";
import { LogoWordmark } from "@/components/ui/logo-wordmark";
import { tokens } from "@/constants/tokens";

export default function SplashScreen() {
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
    backgroundColor: tokens.colors.brand.cream,
  },
});
