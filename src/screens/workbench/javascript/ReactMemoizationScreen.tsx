import {ArrowLeftRight, RotateCcw, RefreshCw} from 'lucide-react-native';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  CodeBlock,
  ExperimentActions,
  ExperimentHeader,
  ExperimentNote,
  MetricGrid,
  SectionHeader,
} from '../../../components/experiment';
import {FilterChip, MetricCard, TerminalLog} from '../../../components/LabUI';
import {
  MEMO_ACCENT,
  MEMO_CODE,
  MEMO_TECHNIQUES,
} from '../../../experiments/javascript/reactMemoization';
import {useReactMemoization} from '../../../hooks/useReactMemoization';
import {categoryColors, colors, spacing} from '../../../theme';
import {MemoComparison, MemoTrendChart} from './memoization/MemoPanels';

export function ReactMemoizationScreen() {
  const insets = useSafeAreaInsets();
  const {
    technique,
    metrics,
    logs,
    selectTechnique,
    updateParent,
    changeProps,
    reset,
  } = useReactMemoization();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        {paddingBottom: insets.bottom + spacing.lg},
      ]}>
      <ExperimentHeader
        domainLabel="REACT · PERFORMANCE"
        domainColor={categoryColors.react}
        title="React Memoization"
        description="Compare without-memo vs React.memo / useMemo / useCallback."
        titleColor={MEMO_ACCENT.primary}
      />

      <View style={styles.chips}>
        {MEMO_TECHNIQUES.map(option => (
          <FilterChip
            key={option.id}
            label={option.label}
            active={technique === option.id}
            onPress={() => selectTechnique(option.id)}
          />
        ))}
      </View>

      <ExperimentActions
        primaryLabel="UPDATE PARENT"
        primaryIcon={RefreshCw}
        onPrimary={updateParent}
        secondaryLabel="CHANGE PROPS"
        secondaryIcon={ArrowLeftRight}
        onSecondary={changeProps}
      />
      <ExperimentActions
        primaryLabel="RESET COUNTERS"
        primaryIcon={RotateCcw}
        onPrimary={reset}
      />

      <MetricGrid>
        <MetricCard
          label="TOTAL RENDERS"
          value={String(metrics.totalRenders)}
          accent={MEMO_ACCENT.primary}
        />
        <MetricCard
          label="SKIPPED RENDERS"
          value={String(metrics.skippedRenders)}
          accent={MEMO_ACCENT.skipped}
          valueColor={MEMO_ACCENT.skipped}
        />
      </MetricGrid>

      <SectionHeader title="RENDER TREND" />
      <MemoTrendChart trend={metrics.trend} />

      <SectionHeader title="COMPARISON" />
      <MemoComparison metrics={metrics} />

      <SectionHeader title="WHAT CHANGED?" />
      <CodeBlock filename="# WHAT CHANGED?" code={MEMO_CODE[technique]} />

      <TerminalLog
        title="RENDER LOG"
        lines={
          logs.length === 0
            ? [{message: 'Trigger UPDATE PARENT or CHANGE PROPS…'}]
            : logs.map(line => ({
                time: line.time,
                level: line.level,
                message: line.message,
              }))
        }
      />

      <ExperimentNote title="Memo Note" accentColor={categoryColors.react}>
        React.memo skips child renders when props are referentially equal.
        useMemo/useCallback stabilize values and callbacks so memoization can
        actually win — unstable object/function props defeat memo.
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
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
