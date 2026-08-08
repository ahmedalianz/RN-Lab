import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text} from '../components/Text';
import {colors, spacing} from '../theme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  scroll?: boolean;
};

export function Screen({
  children,
  style,
  contentStyle,
  scroll = true,
}: Props) {
  const insets = useSafeAreaInsets();
  const padding = {
    paddingTop: spacing.md,
    paddingBottom: insets.bottom + spacing.md,
    paddingHorizontal: spacing.marginMobile,
  };

  if (!scroll) {
    return (
      <View style={[styles.root, padding, style]}>
        <View style={[styles.content, contentStyle]}>{children}</View>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.root, style]}
      contentContainerStyle={[styles.content, padding, contentStyle]}
      keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}

type RowProps = {
  title: string;
  subtitle?: string;
  meta?: string;
  accentColor?: string;
  onPress?: () => void;
};

export function CatalogRow({
  title,
  subtitle,
  meta,
  accentColor,
  onPress,
}: RowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.row,
        accentColor ? {borderLeftWidth: 4, borderLeftColor: accentColor} : null,
        pressed && styles.rowPressed,
      ]}>
      <View style={styles.rowBody}>
        <Text variant="bodyLg">{title}</Text>
        {subtitle ? (
          <Text variant="bodyMd" color={colors.onSurfaceVariant}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {meta ? (
        <Text variant="labelCaps" color={colors.outline}>
          {meta}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    gap: spacing.md,
  },
  row: {
    backgroundColor: colors.surfaceContainer,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 4,
    padding: spacing.containerPadding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rowPressed: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  rowBody: {
    flex: 1,
    gap: 4,
  },
});
