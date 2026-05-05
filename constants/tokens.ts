export const tokens = {
  colors: {
    transparent: 'transparent',
    current: 'currentColor',
    white: '#FFFFFF',
    black: '#000000',

    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#0A0A0A',
    },
    red: {
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444',
    },

    brand: {
      background: '#D3D3D3',
      primary: '#026F6C',
      secondary: '#D96B3A',
      green: '#026F6C',
      yellow: '#F8C630',
      orange: '#D96B3A',
    },
  },

  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
  },

  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },

  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
  },
} as const;

export const appFonts = {
  primary: 'Baloo2Regular',
  primaryMedium: 'Baloo2Medium',
  primarySemiBold: 'Baloo2SemiBold',
  primaryBold: 'Baloo2Bold',
  secondary: 'Baloo2Bold',
  logoRegular: 'Baloo2Regular',
  logoBold: 'Baloo2Bold',
} as const;
