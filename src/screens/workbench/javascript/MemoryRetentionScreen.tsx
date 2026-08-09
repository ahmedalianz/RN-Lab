import {ScrollView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ExperimentHeader,
  ExperimentNote,
  MetricGrid,
  SectionHeader,
} from '../../../components/experiment';
import {MetricCard} from '../../../components/LabUI';
import {useMemoryRetention} from '../../../hooks/useMemoryRetention';
import {categoryColors, colors, spacing} from '../../../theme';
import { LeakSimulation} from './memory/MemoryPanels';

const JS = categoryColors.javascript;
const ACCENT = colors.secondary;
const ACTIVE = colors.tertiaryContainer;

export function MemoryRetentionScreen() {
  const insets = useSafeAreaInsets();
  const {
    closures,
    retained,
    objects,
    heapMb,
    leakKind,
    setLeakKind,
    spark,
    reset,
    createLeak,
    release,
  } = useMemoryRetention();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        {paddingBottom: insets.bottom + spacing.lg},
      ]}>
      <ExperimentHeader
        domainLabel="JAVASCRIPT"
        title="MEMORY RETENTION"
        statusLabel="READY"
        statusColor={colors.statusMastered}
        description="Simulate heap pressure, retained objects, and GC eligibility."
      />

      <SectionHeader title="HEAP METRICS" />
      <MetricGrid>
        <MetricCard label="HEAP SIZE" value={`${heapMb} MB`} accent={JS} />
        <MetricCard
          label="OBJECTS"
          value={objects.toLocaleString()}
          accent={colors.primaryFixedDim}
        />
        <MetricCard
          label="CLOSURES"
          value={String(closures)}
          accent={ACTIVE}
          valueColor={ACTIVE}
        />
        <MetricCard
          label="RETAINED"
          value={String(retained)}
          accent={ACCENT}
          valueColor={ACCENT}
        />
      </MetricGrid>

      <LeakSimulation
        leakKind={leakKind}
        onSelectLeak={setLeakKind}
        onCreateLeak={createLeak}
        onRelease={release}
        onReset={reset}
        spark={spark}
      />

      <ExperimentNote title="Core Principle">
        Memory stays alive while something reachable still references it —
        globals, listeners, timers, or subscriptions. Drop those references and
        the heap becomes eligible for garbage collection.
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
});
