import {StyleSheet, View} from 'react-native';
import type {ExperimentStatus} from '../data/catalog';
import {colors, radii, spacing} from '../theme';
import {Text} from './Text';

type Props = {
  status: ExperimentStatus;
};

const STATUS_META: Record<
  ExperimentStatus,
  {label: string; color: string; filled?: boolean}
> = {
  practicing: {
    label: 'PRACTICING',
    color: colors.statusPracticing,
  },
  mastered: {
    label: 'MASTERED',
    color: colors.statusMastered,
    filled: true,
  },
  not_started: {
    label: 'NOT STARTED',
    color: colors.statusNotStarted,
  },
};

export function StatusBadge({status}: Props) {
  const meta = STATUS_META[status];

  return (
    <View
      style={[
        styles.badge,
        {
          borderColor: meta.color,
          backgroundColor: meta.filled ? meta.color : 'transparent',
        },
      ]}>
      <View
        style={[
          styles.dot,
          {backgroundColor: meta.filled ? '#0e0e0e' : meta.color},
        ]}
      />
      <Text
        variant="labelCaps"
        color={meta.filled ? '#0e0e0e' : meta.color}
        style={styles.label}>
        {meta.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: radii.default,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 10,
  },
});
