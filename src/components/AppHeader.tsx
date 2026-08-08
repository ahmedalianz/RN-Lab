import {Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Search, Settings, Terminal} from 'lucide-react-native';
import {colors, spacing} from '../theme';
import {Icon} from './Icon';
import {Text} from './Text';

type Props = {
  onSearchPress?: () => void;
  onSettingsPress?: () => void;
  showSearch?: boolean;
};

export function AppHeader({
  onSearchPress,
  onSettingsPress,
  showSearch = true,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, {paddingTop: insets.top + spacing.xs}]}>
      <View style={styles.brand}>
        <Icon icon={Terminal} size={18} color={colors.primaryFixedDim} />
        <Text variant="headlineSm" color={colors.primaryFixedDim}>
          RN Lab
        </Text>
      </View>
      <View style={styles.actions}>
        {showSearch ? (
          <Pressable
            onPress={onSearchPress}
            hitSlop={12}
            style={styles.iconBtn}
            accessibilityLabel="Search">
            <Icon icon={Search} size={20} color={colors.onSurface} />
          </Pressable>
        ) : null}
        <Pressable
          onPress={onSettingsPress}
          hitSlop={12}
          style={styles.iconBtn}
          accessibilityLabel="Settings">
          <Icon icon={Settings} size={20} color={colors.outline} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBtn: {
    minWidth: 28,
    alignItems: 'center',
  },
});
