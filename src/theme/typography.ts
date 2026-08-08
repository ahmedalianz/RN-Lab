export const fonts = {
  sans: {
    regular: 'Inter-Regular',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  mono: {
    regular: 'JetBrainsMono-Regular',
    bold: 'JetBrainsMono-Bold',
  },
} as const;

export const typography = {
  headlineLg: {
    fontFamily: fonts.sans.bold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.64,
  },
  headlineMd: {
    fontFamily: fonts.sans.semiBold,
    fontSize: 24,
    lineHeight: 32,
  },
  headlineSm: {
    fontFamily: fonts.sans.semiBold,
    fontSize: 20,
    lineHeight: 28,
  },
  bodyLg: {
    fontFamily: fonts.sans.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMd: {
    fontFamily: fonts.sans.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  codeMd: {
    fontFamily: fonts.mono.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  codeSm: {
    fontFamily: fonts.mono.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  labelCaps: {
    fontFamily: fonts.mono.bold,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.55,
    textTransform: 'uppercase' as const,
  },
  metricDisplay: {
    fontFamily: fonts.mono.bold,
    fontSize: 28,
    lineHeight: 32,
  },
} as const;

export type TypographyToken = keyof typeof typography;
