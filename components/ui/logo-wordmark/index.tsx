import { StyleSheet, Text, type StyleProp, type TextStyle } from "react-native";

import { Fonts } from "@/constants/theme";
import { tokens } from "@/constants/tokens";

type LogoWordmarkProps = {
  size?: "sm" | "md" | "lg";
  style?: StyleProp<TextStyle>;
};

export function LogoWordmark({ size = "md", style }: LogoWordmarkProps) {
  const sizeStyleBySize = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  } as const;

  return (
    <Text style={[styles.base, sizeStyleBySize[size], style]}>
      <Text style={styles.pet}>Pet</Text>
      <Text style={styles.match}>Match</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    letterSpacing: 0.4,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  sizeSm: {
    fontSize: 40,
  },
  sizeMd: {
    fontSize: 64,
  },
  sizeLg: {
    fontSize: 80,
  },
  pet: {
    color: tokens.colors.brand.secondary,
    fontFamily: Fonts.logoBold,
  },
  match: {
    color: tokens.colors.brand.primary,
    fontFamily: Fonts.logoBold,
  },
});
