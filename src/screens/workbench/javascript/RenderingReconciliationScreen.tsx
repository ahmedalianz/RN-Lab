import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ExperimentHeader,
  ExperimentNote,
  MetricGrid,
  SectionHeader,
} from '../../../components/experiment';
import { MetricCard, TerminalLog } from '../../../components/LabUI';
import {
  RECONCILE_ACCENT,
  formatRenderCount,
} from '../../../experiments/javascript/renderingReconciliation';
import { useRenderingReconciliation } from '../../../hooks/useRenderingReconciliation';
import { categoryColors, colors, spacing } from '../../../theme';
import {
  ReconcileActions,
  VirtualDomTree,
} from './reconciliation/ReconcilePanels';

export function RenderingReconciliationScreen() {
  const insets = useSafeAreaInsets();
  const {
    tree,
    metrics,
    logs,
    activeNodeId,
    incrementState,
    changeProps,
    forceRender,
    reset,
  } = useRenderingReconciliation();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + spacing.lg },
      ]}
    >
      <ExperimentHeader
        domainLabel="REACT"
        domainColor={categoryColors.react}
        title="Rendering & Reconciliation"
        description="Fiber work loops, diffs, and commits visualized as a tree."
      />

      <SectionHeader title="VIRTUAL DOM TREE" />
      <VirtualDomTree tree={tree} activeNodeId={activeNodeId} />

      <SectionHeader title="DISPATCH ACTIONS" />
      <ReconcileActions
        onIncrement={incrementState}
        onChangeProps={changeProps}
        onForce={forceRender}
        onReset={reset}
      />

      <SectionHeader title="PROFILER METRICS" />
      <MetricGrid>
        <MetricCard
          label="RENDERS"
          value={formatRenderCount(metrics.renders)}
          accent={RECONCILE_ACCENT.primary}
          valueColor={RECONCILE_ACCENT.primary}
        />
        <MetricCard
          label="DOM UPDATES"
          value={formatRenderCount(metrics.domUpdates)}
          accent={RECONCILE_ACCENT.render}
          valueColor={RECONCILE_ACCENT.render}
        />
        <MetricCard
          label="NODES VISITED"
          value={formatRenderCount(metrics.nodesVisited)}
          accent={RECONCILE_ACCENT.nodes}
          valueColor={RECONCILE_ACCENT.nodes}
        />
        <MetricCard
          label="RENDER TIME"
          value={`${metrics.renderMs.toFixed(1)}ms`}
          accent={colors.onSurface}
        />
      </MetricGrid>

      <TerminalLog
        title="RENDER LOG"
        lines={logs.map(line => ({
          time: line.time,
          level: line.level,
          message: line.message,
        }))}
      />

      <ExperimentNote
        title="Reconciler Note"
        accentColor={categoryColors.react}
      >
        setState walks from the dirty fiber downward. Changing props can touch
        siblings. forceUpdate schedules the full subtree — expensive when the
        tree grows.
      </ExperimentNote>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: spacing.marginMobile,
    gap: spacing.sm,
  }
});
