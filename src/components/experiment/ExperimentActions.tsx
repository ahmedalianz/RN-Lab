import type {LucideIcon} from 'lucide-react-native';
import {Pressable, StyleSheet, View} from 'react-native';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {colors, radii, spacing} from '../../theme';

type Props = {
  primaryLabel: string;
  onPrimary: () => void;
  primaryIcon?: LucideIcon;
  secondaryLabel?: string;
  onSecondary?: () => void;
  secondaryIcon?: LucideIcon;
  primaryDisabled?: boolean;
  secondaryDisabled?: boolean;
};

export function ExperimentActions({
  primaryLabel,
  onPrimary,
  primaryIcon,
  secondaryLabel,
  onSecondary,
  secondaryIcon,
  primaryDisabled = false,
  secondaryDisabled = false,
}: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onPrimary}
        disabled={primaryDisabled}
        style={({pressed}) => [
          styles.primaryBtn,
          primaryDisabled && styles.disabled,
          pressed && styles.pressed,
        ]}>
        {primaryIcon ? (
          <Icon icon={primaryIcon} size={16} color={colors.onPrimary} />
        ) : null}
        <Text variant="labelCaps" color={colors.onPrimary}>
          {primaryLabel}
        </Text>
      </Pressable>
      {secondaryLabel && onSecondary ? (
        <Pressable
          onPress={onSecondary}
          disabled={secondaryDisabled}
          style={({pressed}) => [
            styles.secondaryBtn,
            secondaryDisabled && styles.disabled,
            pressed && styles.pressed,
          ]}>
          {secondaryIcon ? (
            <Icon icon={secondaryIcon} size={16} color={colors.onSurface} />
          ) : null}
          <Text variant="labelCaps">{secondaryLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  primaryBtn: {
    flex: 1,
    height: 44,
    borderRadius: radii.default,
    backgroundColor: colors.primaryFixedDim,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  secondaryBtn: {
    height: 44,
    paddingHorizontal: spacing.md,
    borderRadius: radii.default,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceContainer,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.85,
  },
});
