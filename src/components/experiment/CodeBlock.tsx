import type {ReactNode} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Copy, RefreshCw} from 'lucide-react-native';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {colors, radii, spacing} from '../../theme';

type Props = {
  filename: string;
  code?: string;
  children?: ReactNode;
  actions?: ReactNode;
  onCopy?: () => void;
  onReset?: () => void;
};

export function CodeBlock({
  filename,
  code,
  children,
  actions,
  onCopy,
  onReset,
}: Props) {
  const headerActions =
    actions ??
    (onCopy || onReset ? (
      <View style={styles.iconActions}>
        {onCopy ? (
          <Pressable
            onPress={onCopy}
            style={({pressed}) => [styles.iconBtn, pressed && styles.pressed]}
            accessibilityLabel="Copy code">
            <Icon icon={Copy} size={14} color={colors.outline} />
          </Pressable>
        ) : null}
        {onReset ? (
          <Pressable
            onPress={onReset}
            style={({pressed}) => [styles.iconBtn, pressed && styles.pressed]}
            accessibilityLabel="Reset code">
            <Icon icon={RefreshCw} size={14} color={colors.outline} />
          </Pressable>
        ) : null}
      </View>
    ) : null);

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <Text variant="labelCaps" color={colors.outline}>
          {filename}
        </Text>
        {headerActions}
      </View>
      {children ??
        (code ? (
          <Text variant="codeSm" color={colors.onSurfaceVariant}>
            {code}
          </Text>
        ) : null)}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconActions: {
    flexDirection: 'row',
    gap: 6,
  },
  iconBtn: {
    padding: 4,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  pressed: {
    opacity: 0.85,
  },
});
