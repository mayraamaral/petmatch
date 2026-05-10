import type { StyleProp, ViewStyle } from "react-native";

import LogoNegativeSvg from "@/assets/images/logo-negative.svg";
import LogoSvg from "@/assets/images/logo.svg";

type LogoWordmarkProps = {
  size?: "sm" | "md" | "lg";
  style?: StyleProp<ViewStyle>;
  negative?: boolean;
};

const logoSizeBySize = {
  sm: { width: 128, height: 48 },
  md: { width: 168, height: 63 },
  lg: { width: 224, height: 84 },
} as const;

export function LogoWordmark({ size = "md", style, negative = false }: LogoWordmarkProps) {
  const logoSize = logoSizeBySize[size];
  const LogoComponent = negative ? LogoNegativeSvg : LogoSvg;

  return (
    <LogoComponent
      width={logoSize.width}
      height={logoSize.height}
      style={style}
    />
  );
}
