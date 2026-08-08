import type {LucideIcon} from 'lucide-react-native';
import type {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {colors, spacing} from '../../theme';

type Props = {
  title: string;
  trailing?: ReactNode;
  icon?: LucideIcon;
  color?: string;
};

export function SectionHeader({
  title,
  trailing,
  icon,
  color = colors.outline,
}: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        {icon ? <Icon icon={icon} size={14} color={color} /> : null}
        <Text variant="labelCaps" color={color}>
          {title}
        </Text>
      </View>
      {trailing}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
