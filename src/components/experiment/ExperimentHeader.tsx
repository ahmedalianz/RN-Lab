import type {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../Text';
import {categoryColors, colors, radii, spacing} from '../../theme';

type Props = {
  domainLabel: string;
  title: string;
  description?: string;
  statusLabel?: string;
  statusColor?: string;
  titleColor?: string;
  domainColor?: string;
  trailing?: ReactNode;
};

export function ExperimentHeader({
  domainLabel,
  title,
  description,
  statusLabel = 'READY',
  statusColor = colors.tertiaryContainer,
  titleColor,
  domainColor = categoryColors.javascript,
  trailing,
}: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        <View style={styles.left}>
          <Text variant="labelCaps" color={domainColor}>
            {domainLabel}
          </Text>
          <Text variant="headlineSm" color={titleColor}>
            {title}
          </Text>
        </View>
        {trailing ?? (
          <View style={styles.statusBadge}>
            <Text variant="labelCaps" color={statusColor}>
              {statusLabel}
            </Text>
          </View>
        )}
      </View>
      {description ? (
        <Text variant="bodyMd" color={colors.onSurfaceVariant}>
          {description}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  left: {
    flex: 1,
    gap: 2,
  },
  statusBadge: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radii.default,
    paddingHorizontal: spacing.xs,
    paddingVertical: 6,
  },
});
