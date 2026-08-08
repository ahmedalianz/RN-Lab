import type {ReactNode} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {ChevronRight} from 'lucide-react-native';
import {colors, fonts, radii, spacing} from '../theme';
import {Icon} from './Icon';
import {StatusBadge} from './StatusBadge';
import {Text} from './Text';

type MetricCardProps = {
  label: string;
  value: string;
  accent: string;
  valueColor?: string;
  onPress?: () => void;
};

export function MetricCard({
  label,
  value,
  accent,
  valueColor,
  onPress,
}: MetricCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.metric, pressed && styles.pressed]}>
      <Text variant="labelCaps" color={colors.outline}>
        {label}
      </Text>
      <Text
        variant="metricDisplay"
        color={valueColor ?? colors.onSurface}
        style={styles.value}>
        {value}
      </Text>
      <View style={[styles.accentBar, {backgroundColor: accent}]} />
    </Pressable>
  );
}

type ExperimentCardProps = {
  category: string;
  title: string;
  description?: string;
  accentColor: string;
  status?: 'practicing' | 'mastered' | 'not_started';
  progress?: number;
  footer?: string;
  onPress?: () => void;
  variant?: 'session' | 'list';
};

export function ExperimentCard({
  category,
  title,
  description,
  accentColor,
  status = 'not_started',
  progress,
  footer,
  onPress,
  variant = 'list',
}: ExperimentCardProps) {
  if (variant === 'session') {
    return (
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.sessionCard,
          {borderLeftColor: accentColor},
          pressed && styles.pressed,
        ]}>
        <View style={styles.sessionBody}>
          <Text variant="labelCaps" color={accentColor}>
            {category}
          </Text>
          <Text variant="headlineSm">{title}</Text>
        </View>
        <View style={styles.sessionMeta}>
          {typeof progress === 'number' ? (
            <Text variant="metricDisplay" style={styles.progress}>
              {progress}%
            </Text>
          ) : null}
          <Text variant="labelCaps" color={colors.outline}>
            {status === 'practicing'
              ? 'PRACTICING'
              : status === 'mastered'
                ? 'MASTERED'
                : 'NOT STARTED'}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.listCard,
        {borderLeftColor: accentColor},
        pressed && styles.pressed,
      ]}>
      <View style={styles.listHeader}>
        <Text variant="labelCaps" color={colors.outline}>
          {category}
        </Text>
        <StatusBadge status={status} />
      </View>
      <Text variant="headlineSm">{title}</Text>
      {description ? (
        <Text variant="bodyMd" color={colors.onSurfaceVariant}>
          {description}
        </Text>
      ) : null}
      {footer ? (
        <>
          <View style={styles.divider} />
          <View style={styles.listFooter}>
            <Text variant="codeSm" color={colors.outline}>
              {footer}
            </Text>
            <Icon icon={ChevronRight} size={16} color={colors.outline} />
          </View>
        </>
      ) : null}
    </Pressable>
  );
}

type ButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
};

export function LabButton({
  label,
  onPress,
  icon,
  variant = 'primary',
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';
  const isSecondary = variant === 'secondary';

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.btn,
        isPrimary && styles.btnPrimary,
        isSecondary && styles.btnSecondary,
        variant === 'ghost' && styles.btnGhost,
        isDanger && styles.btnDanger,
        pressed && styles.pressed,
      ]}>
      {icon}
      <Text
        variant="bodyMd"
        color={
          isPrimary
            ? colors.onPrimary
            : isDanger
              ? colors.error
              : colors.onSurface
        }
        style={styles.btnLabel}>
        {label}
      </Text>
    </Pressable>
  );
}

type TerminalProps = {
  title?: string;
  lines: Array<{time?: string; level?: string; message: string}>;
};

export function TerminalLog({title = 'TERMINAL LOG', lines}: TerminalProps) {
  return (
    <View style={styles.terminal}>
      <View style={styles.terminalHeader}>
        <Text variant="labelCaps" color={colors.outline}>
          {title}
        </Text>
        <View style={styles.windowDots}>
          <View style={[styles.dot, {backgroundColor: '#ff5f57'}]} />
          <View style={[styles.dot, {backgroundColor: '#febc2e'}]} />
          <View style={[styles.dot, {backgroundColor: '#28c840'}]} />
        </View>
      </View>
      <View style={styles.terminalBody}>
        {lines.map((line, index) => (
          <Text key={`${line.message}-${index}`} variant="codeSm">
            {line.time ? (
              <Text variant="codeSm" color={colors.outline}>
                [{line.time}]{' '}
              </Text>
            ) : null}
            {line.level ? (
              <Text
                variant="codeSm"
                color={
                  line.level === 'WARN' || line.level === 'ERR'
                    ? colors.secondary
                    : line.level === 'SUCCESS'
                      ? colors.primaryFixedDim
                      : colors.onSurfaceVariant
                }>
                {line.level}{' '}
              </Text>
            ) : null}
            <Text
              variant="codeSm"
              color={
                line.level === 'SUCCESS'
                  ? colors.primaryFixedDim
                  : colors.onSurfaceVariant
              }>
              {line.message}
            </Text>
          </Text>
        ))}
      </View>
    </View>
  );
}

type FilterChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export function FilterChip({label, active, onPress}: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}>
      <Text
        variant="labelCaps"
        color={active ? colors.primaryFixedDim : colors.outline}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  metric: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    gap: spacing.xs,
    overflow: 'hidden',
  },
  value: {
    fontSize: 28,
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 3,
  },
  pressed: {
    opacity: 0.85,
  },
  sessionCard: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    borderLeftWidth: 4,
    padding: spacing.containerPadding,
    gap: spacing.sm,
  },
  sessionBody: {
    flex: 1,
    gap: 4,
  },
  sessionMeta: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 4,
  },
  progress: {
    fontSize: 22,
    lineHeight: 28,
  },
  listCard: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderLeftWidth: 4,
    padding: spacing.containerPadding,
    gap: spacing.xs,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.outlineVariant,
    marginTop: spacing.xs,
  },
  listFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    height: 36,
    borderRadius: radii.default,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    alignSelf: 'stretch',
  },
  btnPrimary: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primaryContainer,
  },
  btnSecondary: {
    backgroundColor: colors.surfaceContainer,
    borderColor: colors.border,
  },
  btnGhost: {
    backgroundColor: 'transparent',
    borderColor: colors.primaryFixedDim,
  },
  btnDanger: {
    backgroundColor: 'transparent',
    borderColor: colors.error,
  },
  btnLabel: {
    fontFamily: fonts.sans.semiBold,
  },
  terminal: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    overflow: 'hidden',
  },
  terminalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surfaceContainer,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  windowDots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  terminalBody: {
    backgroundColor: colors.terminal,
    padding: spacing.containerPadding,
    gap: 6,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radii.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  chipActive: {
    borderColor: colors.primaryFixedDim,
    backgroundColor: colors.surfaceContainerHigh,
  },
});
