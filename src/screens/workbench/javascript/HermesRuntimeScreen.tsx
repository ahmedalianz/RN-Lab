import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Play} from 'lucide-react-native';
import {
  ExperimentActions,
  ExperimentHeader,
  ExperimentNote,
  MetricGrid,
  SectionHeader,
} from '../../../components/experiment';
import {MetricCard, TerminalLog} from '../../../components/LabUI';
import {Text} from '../../../components/Text';
import {HERMES_ACCENT} from '../../../experiments/javascript/hermesRuntime';
import {useHermesRuntime} from '../../../hooks/useHermesRuntime';
import {colors, spacing} from '../../../theme';
import {HermesArchitecture} from './components/HermesArchitecture';

export function HermesRuntimeScreen() {
  const insets = useSafeAreaInsets();
  const {active, metrics, logs, highlight, setHighlight, runBenchmark} =
    useHermesRuntime();

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
        description="Inspect the JavaScript engine powering React Native."
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
              {active ? 'ACTIVE' : 'IDLE'}
            </Text>
          </View>
        }
      />

      <MetricGrid>
        <MetricCard
          label="HEAP"
          value={metrics.heap}
          accent={HERMES_ACCENT.heap}
        />
        <MetricCard
          label="EXECUTION"
          value={metrics.execution}
          accent={HERMES_ACCENT.active}
          valueColor={HERMES_ACCENT.active}
        />
        <MetricCard
          label="GC"
          value={metrics.gc}
          accent={HERMES_ACCENT.gc}
          valueColor={HERMES_ACCENT.gc}
        />
        <MetricCard
          label="BYTECODE"
          value={metrics.bytecode}
          accent={HERMES_ACCENT.bytecode}
          valueColor={HERMES_ACCENT.bytecode}
        />
      </MetricGrid>

      <ExperimentActions
        primaryLabel="RUN BENCHMARK"
        primaryIcon={Play}
        onPrimary={runBenchmark}
      />

      <SectionHeader title="ARCHITECTURE" />
      <HermesArchitecture highlight={highlight} onHighlight={setHighlight} />

      <TerminalLog
        title="TERMINAL LOGS"
        lines={logs.map(line => ({
          time: line.time,
          level: line.level,
          message: line.message,
        }))}
      />

      <ExperimentNote title="Engine Note">
        Hermes compiles JavaScript ahead of time into compact bytecode,
        reducing parse time and memory on device. GC pauses show up here when
        retained closures or large allocations pressure the heap.
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
});
