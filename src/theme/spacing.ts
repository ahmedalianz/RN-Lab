/** 4pt base unit — 8pt grid with 4pt sub-grid for dense technical UI */
export const spacing = {
  unit: 4,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  gutter: 16,
  marginMobile: 16,
  marginTablet: 24,
  containerPadding: 12,
} as const;

export type SpacingToken = keyof typeof spacing;
