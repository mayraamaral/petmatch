import { appFonts, tokens } from '@/constants/tokens';

export const Colors = {
  light: {
    text: tokens.colors.brand.primary,
    background: tokens.colors.white,
    surface: tokens.colors.brand.background,
    tint: tokens.colors.brand.primary,
    icon: tokens.colors.gray[500],
    tabIconDefault: tokens.colors.gray[500],
    tabIconSelected: tokens.colors.brand.primary,
    primary: tokens.colors.brand.primary,
    secondaryGreen: tokens.colors.brand.green,
    secondaryYellow: tokens.colors.brand.yellow,
    orange: tokens.colors.brand.orange,
    border: tokens.colors.gray[200],
    muted: tokens.colors.gray[600],
  },
  dark: {
    text: tokens.colors.white,
    background: '#0B1B10',
    surface: '#0F2A18',
    tint: tokens.colors.brand.green,
    icon: tokens.colors.gray[300],
    tabIconDefault: tokens.colors.gray[300],
    tabIconSelected: tokens.colors.brand.green,
    primary: tokens.colors.brand.primary,
    secondaryGreen: tokens.colors.brand.green,
    secondaryYellow: tokens.colors.brand.yellow,
    orange: tokens.colors.brand.orange,
    border: '#1C3A27',
    muted: tokens.colors.gray[300],
  },
};

export const Fonts = {
  primary: appFonts.primary,
  medium: appFonts.primaryMedium,
  semiBold: appFonts.primarySemiBold,
  bold: appFonts.primaryBold,
  secondary: appFonts.secondary,
};
