import {colors} from '../theme';

export const stackScreenOptions = {
  headerStyle: {
    backgroundColor: colors.surfaceContainer,
  },
  headerTintColor: colors.onSurface,
  headerTitleStyle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  headerShadowVisible: false,
  contentStyle: {
    backgroundColor: colors.background,
  },
} as const;
