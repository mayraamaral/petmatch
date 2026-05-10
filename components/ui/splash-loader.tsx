import { StyleSheet, View } from "react-native";

import { LogoWordmark } from "@/components/ui/logo-wordmark";
import { tokens } from "@/constants/tokens";

export function SplashLoader() {
  return (
    <View style={styles.container}>
      <LogoWordmark size="lg" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colors.white,
  },
});
