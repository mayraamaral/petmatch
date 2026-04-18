import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { type ReactNode } from "react";

import { Fonts } from "@/constants/theme";
import { tokens } from "@/constants/tokens";

type CardSize = "sm" | "md" | "lg";
type CardVariant = "normal" | "info";

type BaseCardProps = {
  size?: CardSize;
  variant?: CardVariant;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

type NormalCardProps = BaseCardProps & {
  variant?: "normal";
  infoText?: never;
  infoTextStyle?: never;
  infoContainerStyle?: never;
};

type InfoCardProps = BaseCardProps & {
  variant: "info";
  infoText: ReactNode;
  infoTextStyle?: StyleProp<TextStyle>;
  infoContainerStyle?: StyleProp<ViewStyle>;
};

type CardProps = NormalCardProps | InfoCardProps;

export function Card({
  size = "md",
  variant = "normal",
  children,
  style,
  infoText,
  infoTextStyle,
  infoContainerStyle,
}: CardProps) {
  const normalSizeStyleBySize = {
    sm: styles.normalSizeSm,
    md: styles.normalSizeMd,
    lg: styles.normalSizeLg,
  } as const;

  const infoMainAreaHeightStyleBySize = {
    sm: styles.infoMainAreaHeightSm,
    md: styles.infoMainAreaHeightMd,
    lg: styles.infoMainAreaHeightLg,
  } as const;

  const infoMinHeightBySize = {
    sm: styles.infoMinHeightSm,
    md: styles.infoMinHeightMd,
    lg: styles.infoMinHeightLg,
  } as const;

  const normalSizeStyle = normalSizeStyleBySize[size];
  const infoMainAreaHeightStyle = infoMainAreaHeightStyleBySize[size];
  const infoMinHeightStyle = infoMinHeightBySize[size];

  if (variant === "info") {
    return (
      <View style={[styles.base, styles.infoCard, style]}>
        <View style={[styles.mainArea, infoMainAreaHeightStyle]}>{children}</View>
        <View
          style={[
            styles.infoArea,
            infoMinHeightStyle,
            infoContainerStyle,
          ]}
        >
          {typeof infoText === "string" ? (
            <Text style={[styles.infoText, infoTextStyle]}>{infoText}</Text>
          ) : (
            infoText
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.base, styles.normalCard, normalSizeStyle, style]}>
      <View style={[styles.mainArea, { flex: 1 }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    borderRadius: tokens.radius.md,
    overflow: "hidden",
  },
  normalCard: {
    backgroundColor: tokens.colors.brand.green,
  },
  infoCard: {
    backgroundColor: tokens.colors.brand.green,
  },
  normalSizeSm: {
    height: 180,
  },
  normalSizeMd: {
    height: 260,
  },
  normalSizeLg: {
    height: 320,
  },
  infoMainAreaHeightSm: {
    height: 180,
  },
  infoMainAreaHeightMd: {
    height: 260,
  },
  infoMainAreaHeightLg: {
    height: 320,
  },
  mainArea: {
    backgroundColor: tokens.colors.brand.green,
  },
  infoArea: {
    backgroundColor: tokens.colors.brand.primary,
    paddingHorizontal: tokens.spacing[4],
    paddingVertical: tokens.spacing[3],
  },
  infoMinHeightSm: {
    minHeight: 56,
  },
  infoMinHeightMd: {
    minHeight: 72,
  },
  infoMinHeightLg: {
    minHeight: 88,
  },
  infoText: {
    color: tokens.colors.white,
    fontFamily: Fonts.primary,
    fontSize: tokens.fontSize.base,
    lineHeight: tokens.lineHeight.base,
  },
});
