import { StyleSheet, View } from "react-native";

import LogoSvg from "@/assets/images/logo.svg";
import { LogoWordmark } from "@/components/ui/logo-wordmark";
import { tokens } from "@/constants/tokens";

type LogoFullProps = {
  size?: "sm" | "md" | "lg";
};

export function LogoFull({ size = "md" }: LogoFullProps) {
  const iconSize = size === "sm" ? 32 : size === "md" ? 48 : 64;

  return (
    <View style={styles.container}>
      <LogoWordmark size={size} />
      <LogoSvg width={iconSize} height={iconSize} color={tokens.colors.brand.green} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginLeft: 4,
  },
});
