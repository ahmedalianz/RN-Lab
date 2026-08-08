import type {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {spacing} from '../../theme';

type Props = {
  children: ReactNode;
};

export function MetricGrid({children}: Props) {
  return <View style={styles.grid}>{children}</View>;
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
