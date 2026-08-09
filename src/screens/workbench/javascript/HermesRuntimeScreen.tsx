import { Play, RotateCcw } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ExperimentActions,
  ExperimentHeader,
  ExperimentNote,
  MetricGrid,
  SectionHeader,
} from '../../../components/experiment';
import { MetricCard, TerminalLog } from '../../../components/LabUI';
import { Text } from '../../../components/Text';
import { HERMES_ACCENT } from '../../../experiments/javascript/hermesRuntime';
import { useHermesRuntime } from '../../../hooks/useHermesRuntime';
import { colors, radii, spacing } from '../../../theme';
import { HermesArchitecture } from './components/HermesArchitecture';
import { HermesWorkloadControls } from './components/HermesWorkloadControls';

export function HermesRuntimeScreen() {
  const insets = useSafeAreaInsets();
  const {
    active,
    phase,
    itemCount,
    setItemCount,
    adjustItemCount,
    canAdjust,
    itemBounds,
    displayMetrics,
    logs,
    highlight,
    runBenchmark,
    reset,
  } = useHermesRuntime();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        {paddingBottom: insets.bottom + spacing.lg},
      ]}>
      <ExperimentHeader
        domainLabel="JAVASCRIPT"
        title="Hermes Runtime"
        description="Simulate bytecode compile, heap allocation, execution, and GC."
        trailing={
          <View style={styles.status}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: active
                    ? colors.statusMastered
                    : colors.outline,
                },
              ]}
            />
            <Text
              variant="labelCaps"
              color={active ? colors.statusMastered : colors.outline}>
              {active ? 'RUNNING' : phase === 'done' ? 'DONE' : 'IDLE'}
            </Text>
          </View>
        }
      />

      <HermesWorkloadControls
        itemCount={itemCount}
        canAdjust={canAdjust}
        step={itemBounds.step}
        onSelectPreset={setItemCount}
        onAdjust={adjustItemCount}
      />

      <View style={styles.phaseRow}>
        <Text variant="labelCaps" color={colors.outline}>
          PHASE
        </Text>
        <View style={styles.phaseBadge}>
          <Text variant="labelCaps" color={colors.primaryFixedDim}>
            {phase.toUpperCase()}
          </Text>
        </View>
      </View>

      <MetricGrid>
        <MetricCard
          label="HEAP"
          value={displayMetrics.heap}
          accent={HERMES_ACCENT.heap}
          valueColor={
            highlight === 'memory' ? HERMES_ACCENT.heap : colors.onSurface
          }
        />
        <MetricCard
          label="EXECUTION"
          value={displayMetrics.execution}
          accent={HERMES_ACCENT.active}
          valueColor={HERMES_ACCENT.active}
        />
        <MetricCard
          label="GC"
          value={displayMetrics.gc}
          accent={HERMES_ACCENT.gc}
          valueColor={HERMES_ACCENT.gc}
        />
        <MetricCard
          label="BYTECODE"
          value={displayMetrics.bytecode}
          accent={HERMES_ACCENT.bytecode}
          valueColor={
            highlight === 'bytecode'
              ? HERMES_ACCENT.bytecode
              : colors.onSurface
          }
        />
      </MetricGrid>

      <ExperimentActions
        primaryLabel={active ? 'RUNNING…' : 'RUN SIMULATION'}
        primaryIcon={Play}
        onPrimary={runBenchmark}
        primaryDisabled={active}
        secondaryLabel="RESET"
        secondaryIcon={RotateCcw}
        onSecondary={reset}
      />

      <SectionHeader title="ARCHITECTURE" />
      <HermesArchitecture highlight={highlight} />

      <TerminalLog
        title="TERMINAL LOGS"
        lines={logs.map(line => ({
          time: line.time,
          level: line.level,
          message: line.message,
        }))}
      />

      <ExperimentNote title="Engine Note">
        Larger workloads increase bytecode size, heap allocation, execution
        time, and GC pause. Hermes still avoids a full JS parse on device by
        shipping ahead-of-time bytecode.
      </ExperimentNote>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.background},
  content: {
    padding: spacing.marginMobile,
    gap: spacing.sm,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  phaseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phaseBadge: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radii.default,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
  },
});
