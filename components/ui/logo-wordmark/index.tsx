import type { StyleProp, ViewStyle } from "react-native";

import LogoSvg from "@/assets/images/logo.svg";

type LogoWordmarkProps = {
  size?: "sm" | "md" | "lg";
  style?: StyleProp<ViewStyle>;
};

const logoSizeBySize = {
  sm: { width: 128, height: 48 },
  md: { width: 168, height: 63 },
  lg: { width: 224, height: 84 },
} as const;

export function LogoWordmark({ size = "md", style }: LogoWordmarkProps) {
  const logoSize = logoSizeBySize[size];

  return (
    <LogoSvg
      width={logoSize.width}
      height={logoSize.height}
      style={style}
    />
  );
}
