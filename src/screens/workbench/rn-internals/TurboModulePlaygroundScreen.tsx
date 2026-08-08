import {StyleSheet, View} from 'react-native';
import type {LucideIcon} from 'lucide-react-native';
import {
  Braces,
  Code2,
  Cpu,
  Gauge,
  Network,
  Play,
} from 'lucide-react-native';
import {Icon} from '../../../components/Icon';
import {LabButton, TerminalLog} from '../../../components/LabUI';
import {Screen} from '../../../components/Screen';
import {Text} from '../../../components/Text';
import {colors, radii, spacing} from '../../../theme';

const LAYERS: Array<{title: string; accent: string; icon: LucideIcon}> = [
  {title: 'Layer 01 — JavaScript', accent: '#5cd5f6', icon: Braces},
  {title: 'Layer 02 — TurboModule', accent: '#5cd5f6', icon: Network},
  {title: 'Layer 03 — JSI (C++)', accent: '#ffb875', icon: Code2},
  {title: 'Layer 04 — Native (Obj-C/Java)', accent: '#ff9999', icon: Cpu},
];

export function TurboModulePlaygroundScreen() {
  return (
    <Screen contentStyle={styles.content}>
      <Text variant="headlineSm">TurboModule Architecture</Text>
      <Text variant="bodyMd" color={colors.onSurfaceVariant}>
        Direct native invocation bypasses the JSON serialization bridge.
      </Text>

      {LAYERS.map(layer => (
        <View
          key={layer.title}
          style={[styles.layer, {borderLeftColor: layer.accent}]}>
          <Text variant="bodyLg">{layer.title}</Text>
          <Icon icon={layer.icon} size={18} color={layer.accent} />
        </View>
      ))}

      <View style={styles.metricsCard}>
        <View style={styles.metricsHeader}>
          <Text variant="bodyLg">Benchmark Metrics</Text>
          <Icon icon={Gauge} size={16} color={colors.outline} />
        </View>
        <Text variant="codeSm" color={colors.outline}>
          Method: getDeviceInfo()
        </Text>
        <View style={styles.metricRow}>
          <View style={styles.metricBox}>
            <Text variant="labelCaps" color={colors.outline}>
              CALLS
            </Text>
            <Text variant="metricDisplay">1,024</Text>
          </View>
          <View style={styles.metricBox}>
            <Text variant="labelCaps" color={colors.outline}>
              AVG LATENCY
            </Text>
            <Text variant="metricDisplay" color={colors.primaryFixedDim}>
              0.021 ms
            </Text>
          </View>
        </View>

        <Text variant="labelCaps" color={colors.outline}>
          LATENCY COMPARISON (LOWER IS BETTER)
        </Text>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, styles.legacyBar]} />
        </View>
        <Text variant="codeSm" color={colors.error}>
          Legacy Bridge · 2.45ms
        </Text>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, styles.jsiBar]} />
        </View>
        <Text variant="codeSm" color={colors.primaryFixedDim}>
          JSI TurboModule · 0.021ms
        </Text>

        <LabButton
          label="Run Benchmark"
          icon={<Icon icon={Play} size={14} color={colors.onPrimary} />}
        />
      </View>

      <TerminalLog
        title="// Diagnostic Logs"
        lines={[
          {
            time: '10:42:01',
            level: 'INFO',
            message: 'Initializing TurboModuleManager',
          },
          {
            time: '10:42:01',
            level: 'INFO',
            message: 'Binding JSI bindings for RNLabDeviceInfo',
          },
          {
            time: '10:42:02',
            level: 'SUCCESS',
            message: 'JSI layer ready. Awaiting invocation.',
          },
        ]}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  layer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
  },
  metricsCard: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    gap: spacing.sm,
  },
  metricsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metricBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    gap: 4,
  },
  barTrack: {
    height: 8,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  legacyBar: {
    width: '92%',
    backgroundColor: colors.error,
  },
  jsiBar: {
    width: '8%',
    backgroundColor: colors.primaryFixedDim,
  },
});
