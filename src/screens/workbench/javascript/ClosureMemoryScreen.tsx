import {ScrollView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ExperimentHeader,
  ExperimentNote,
  MetricGrid,
  SectionHeader,
} from '../../../components/experiment';
import {MetricCard} from '../../../components/LabUI';
import {useClosureMemory} from '../../../hooks/useClosureMemory';
import {categoryColors, colors, spacing} from '../../../theme';
import {
  ClosureCodePanel,
  HeapMemoryMap,
  Inspector,
  LeakSimulation,
  ScopeChain,
} from './closure/ClosurePanels';

const JS = categoryColors.javascript;
const ACCENT = colors.secondary;
const ACTIVE = colors.tertiaryContainer;

export function ClosureMemoryScreen() {
  const insets = useSafeAreaInsets();
  const {
    count,
    closures,
    retained,
    objects,
    heapMb,
    stepHighlight,
    leakKind,
    setLeakKind,
    spark,
    run,
    step,
    reset,
    createLeak,
    release,
  } = useClosureMemory();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        {paddingBottom: insets.bottom + spacing.lg},
      ]}>
      <ExperimentHeader
        domainLabel="JAVASCRIPT"
        title="CLOSURE & MEMORY"
        statusLabel="READY"
        statusColor={colors.statusMastered}
        description="Inspect lexical scope, captured variables and memory retention."
      />

      <ClosureCodePanel
        stepHighlight={stepHighlight}
        onRun={run}
        onStep={step}
        onReset={reset}
      />

      <SectionHeader title="SCOPE CHAIN" />
      <ScopeChain count={count} />

      <SectionHeader title="INSPECTOR" />
      <Inspector count={count} />

      <HeapMemoryMap />

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
        spark={spark}
      />

      <ExperimentNote title="Core Principle">
        Closures retain their lexical environment. If a global variable,
        listener, or timer keeps a closure alive, captured memory cannot be
        collected — even after the outer function returns.
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
