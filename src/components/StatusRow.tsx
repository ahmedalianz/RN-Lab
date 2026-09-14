import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, spacing, typography} from '../theme';

type StatusRowProps = {
  label: string;
  value: string;
};

export function StatusRow({label, value}: StatusRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.text.muted,
    flexShrink: 0,
    width: '42%',
  },
  value: {
    ...typography.mono,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'right',
  },
});
