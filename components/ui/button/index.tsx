import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Fonts } from "@/constants/theme";
import { tokens } from "@/constants/tokens";

import {
  BUTTON_CONTAINER_SIZE_STYLE_KEY_BY_SIZE,
  BUTTON_DEFAULT_FULL_WIDTH,
  BUTTON_DEFAULT_ICON_NAME,
  BUTTON_DEFAULT_SIZE,
  BUTTON_DEFAULT_VARIANT,
  BUTTON_ICON_CONTAINER_SIZE_STYLE_KEY_BY_SIZE,
  BUTTON_ICON_GLYPH_SIZE_BY_SIZE,
  BUTTON_LABEL_SIZE_STYLE_KEY_BY_SIZE,
  BUTTON_LABEL_STYLE_KEY_BY_VARIANT,
  BUTTON_SHAPE_STYLE_KEY_BY_SHAPE,
  type ButtonShape,
  type ButtonSize,
  type ButtonVariant,
} from "./button.constants";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

type BaseButtonProps = PressableProps & {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  size?: ButtonSize;
  uppercase?: boolean;
  fullWidth?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

type TextButtonProps = BaseButtonProps & {
  variant?: "primary" | "tertiary" | "success" | "danger" | "warning" | "link";
  label: string;
  iconName?: never;
  iconSize?: never;
  iconColor?: never;
};

type IconTextButtonProps = BaseButtonProps & {
  variant: "iconText";
  label: string;
  iconName: IconName;
  iconSize?: number;
  iconColor?: string;
};

type IconButtonProps = BaseButtonProps & {
  variant: "icon";
  iconName: IconName;
  iconSize?: number;
  iconColor?: string;
  label?: never;
  labelStyle?: never;
};

export type ButtonProps = TextButtonProps | IconTextButtonProps | IconButtonProps;

export function Button({
  variant = BUTTON_DEFAULT_VARIANT,
  shape,
  size = BUTTON_DEFAULT_SIZE,
  uppercase,
  fullWidth = BUTTON_DEFAULT_FULL_WIDTH,
  containerStyle,
  labelStyle,
  disabled,
  label,
  iconName,
  iconSize,
  iconColor = tokens.colors.white,
  ...props
}: ButtonProps) {
  const isLink = variant === "link";
  const isIcon = variant === "icon";
  const isIconText = variant === "iconText";
  const resolvedShape = shape ?? (isIcon ? "pill" : "rounded");
  const shapeStyleKey = BUTTON_SHAPE_STYLE_KEY_BY_SHAPE[resolvedShape];
  const labelStyleKey = BUTTON_LABEL_STYLE_KEY_BY_VARIANT[variant];
  const sizeStyleKey = BUTTON_CONTAINER_SIZE_STYLE_KEY_BY_SIZE[size];
  const iconSizeStyleKey = BUTTON_ICON_CONTAINER_SIZE_STYLE_KEY_BY_SIZE[size];
  const labelSizeStyleKey = BUTTON_LABEL_SIZE_STYLE_KEY_BY_SIZE[size];
  const resolvedIconSize = iconSize ?? BUTTON_ICON_GLYPH_SIZE_BY_SIZE[size];
  const shouldUppercase = uppercase ?? false;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={props.accessibilityLabel ?? (isIcon ? iconName : label)}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        fullWidth && !isLink && !isIcon ? styles.fullWidth : undefined,
        styles[variant],
        !isLink && !isIcon ? styles[sizeStyleKey] : undefined,
        isIcon ? styles[iconSizeStyleKey] : undefined,
        !isLink && shapeStyleKey ? styles[shapeStyleKey] : undefined,
        pressed && !disabled ? styles.pressed : undefined,
        disabled ? styles.disabled : undefined,
        containerStyle,
      ]}
      {...props}
    >
      {isIcon ? (
        <MaterialCommunityIcons
          name={(iconName ?? BUTTON_DEFAULT_ICON_NAME) as IconName}
          size={resolvedIconSize}
          color={iconColor}
        />
      ) : isIconText ? (
        <View style={styles.iconTextContent}>
          <MaterialCommunityIcons
            name={(iconName ?? BUTTON_DEFAULT_ICON_NAME) as IconName}
            size={resolvedIconSize}
            color={iconColor}
          />
          <Text
            style={[
              styles.labelBase,
              styles[labelSizeStyleKey],
              styles[labelStyleKey],
              shouldUppercase ? styles.uppercaseLabel : styles.normalCaseLabel,
              labelStyle,
            ]}
          >
            {label}
          </Text>
        </View>
      ) : (
        <Text
          style={[
            styles.labelBase,
            styles[labelSizeStyleKey],
            styles[labelStyleKey],
            shouldUppercase ? styles.uppercaseLabel : styles.normalCaseLabel,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    width: "100%",
  },
  primary: {
    backgroundColor: tokens.colors.brand.green,
    borderRadius: tokens.radius.md,
  },
  tertiary: {
    backgroundColor: tokens.colors.brand.cream,
    borderRadius: tokens.radius.md,
  },
  success: {
    backgroundColor: tokens.colors.brand.primary,
    borderRadius: tokens.radius.md,
  },
  danger: {
    backgroundColor: tokens.colors.red[400],
    borderRadius: tokens.radius.md,
  },
  warning: {
    backgroundColor: tokens.colors.brand.yellow,
    borderRadius: tokens.radius.md,
  },
  iconText: {
    backgroundColor: tokens.colors.brand.green,
    borderRadius: tokens.radius.xl,
  },
  link: {
    backgroundColor: "transparent",
    minHeight: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  icon: {
    backgroundColor: tokens.colors.brand.green,
    borderRadius: tokens.radius.xl,
  },
  sizeSm: {
    minHeight: 48,
    paddingHorizontal: tokens.spacing[4],
  },
  sizeMd: {
    minHeight: 64,
    paddingHorizontal: tokens.spacing[5],
  },
  sizeLg: {
    minHeight: 96,
    paddingHorizontal: tokens.spacing[6],
  },
  iconSizeSm: {
    width: 40,
    height: 40,
  },
  iconSizeMd: {
    width: 56,
    height: 56,
  },
  iconSizeLg: {
    width: 72,
    height: 72,
  },
  iconTextContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing[3],
  },
  pillShape: {
    borderRadius: tokens.radius.full,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  labelBase: {
    fontFamily: Fonts.bold,
    letterSpacing: 0.8,
    textAlign: "center",
  },
  uppercaseLabel: {
    textTransform: "uppercase",
  },
  normalCaseLabel: {
    textTransform: "none",
  },
  labelSm: {
    fontSize: tokens.fontSize.xl,
    lineHeight: tokens.lineHeight.xl,
  },
  labelMd: {
    fontSize: tokens.fontSize["2xl"],
    lineHeight: tokens.lineHeight["2xl"],
  },
  labelLg: {
    fontSize: tokens.fontSize["3xl"],
    lineHeight: tokens.lineHeight["3xl"],
  },
  primaryLabel: {
    color: tokens.colors.white,
  },
  tertiaryLabel: {
    color: tokens.colors.black,
  },
  successLabel: {
    color: tokens.colors.white,
  },
  dangerLabel: {
    color: tokens.colors.white,
  },
  warningLabel: {
    color: tokens.colors.black,
  },
  linkLabel: {
    color: tokens.colors.black,
    fontFamily: Fonts.primary,
    fontSize: tokens.fontSize.base,
    lineHeight: tokens.lineHeight.base,
    letterSpacing: 0,
    textTransform: "none",
  },
  noLabel: {},
});
