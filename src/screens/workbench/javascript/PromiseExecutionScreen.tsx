import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Play, SkipForward} from 'lucide-react-native';
import {
  CodeBlock,
  ColoredTerminal,
  ExperimentActions,
  ExperimentHeader,
  MetricGrid,
  QueuePanel,
  SectionHeader,
} from '../../../components/experiment';
import {FilterChip, MetricCard} from '../../../components/LabUI';
import {Text} from '../../../components/Text';
import {
  PROMISE_CODE,
  TASK_COLORS,
} from '../../../experiments/javascript/promiseExecution';
import {usePromiseExecution} from '../../../hooks/usePromiseExecution';
import {colors, radii, spacing} from '../../../theme';

const {sync: SYNC, micro: MICRO, macro: MACRO} = TASK_COLORS;

export function PromiseExecutionScreen() {
  const insets = useSafeAreaInsets();
  const {scenario, current, done, selectScenario, nextStep, runAll} =
    usePromiseExecution();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        {paddingBottom: insets.bottom + spacing.lg},
      ]}>
      <ExperimentHeader
        domainLabel="JAVASCRIPT"
        title="Promise Execution"
        titleColor={SYNC}
        statusColor={MICRO}
        description="Observe asynchronous execution and Promise scheduling."
      />

      <View style={styles.chips}>
        <FilterChip
          label="Promise.resolve"
          active={scenario === 'resolve'}
          onPress={() => selectScenario('resolve')}
        />
        <FilterChip
          label="Promise.all"
          active={scenario === 'all'}
          onPress={() => selectScenario('all')}
        />
        <FilterChip
          label="async/await"
          active={scenario === 'async'}
          onPress={() => selectScenario('async')}
        />
      </View>

      <CodeBlock filename="EXECUTOR.JS" code={PROMISE_CODE[scenario]} />

      <ExperimentActions
        primaryLabel="RUN EXPERIMENT"
        primaryIcon={Play}
        onPrimary={runAll}
        secondaryLabel="STEP"
        secondaryIcon={SkipForward}
        onSecondary={nextStep}
        secondaryDisabled={done}
      />

      <MetricGrid>
        <MetricCard label="TASKS" value={String(current.tasks)} accent={SYNC} />
        <MetricCard
          label="MICROTASKS"
          value={String(current.microCount)}
          accent={MICRO}
          valueColor={MICRO}
        />
        <MetricCard
          label="MACROTASKS"
          value={String(current.macroCount)}
          accent={MACRO}
          valueColor={MACRO}
        />
        <MetricCard
          label="EXECUTION TIME"
          value={current.execMs}
          accent={SYNC}
        />
      </MetricGrid>

      <SectionHeader title="ARCHITECTURE" />
      <View style={styles.arch}>
        <QueuePanel
          title="CALL STACK"
          accent={SYNC}
          items={current.queues.callStack}
        />
        <QueuePanel
          title="MICROTASK Q"
          accent={MICRO}
          items={current.queues.microtasks}
        />
        <QueuePanel
          title="MACROTASK Q"
          accent={MACRO}
          items={current.queues.macrotasks}
        />
      </View>

      <SectionHeader title="EXECUTION ORDER" />
      <ExecutionOrder order={current.order} />

      <ColoredTerminal
        lines={
          current.logs.length === 0
            ? [{message: 'awaiting execution…', color: colors.outline}]
            : current.logs
        }
      />
    </ScrollView>
  );
}

function ExecutionOrder({
  order,
}: {
  order: Array<{label: string; color: string}>;
}) {
  if (order.length === 0) {
    return (
      <Text variant="codeSm" color={colors.outline}>
        Press STEP or RUN to begin
      </Text>
    );
  }

  return (
    <View style={styles.orderRow}>
      {order.map((item, index) => (
        <View key={`${item.label}-${index}`} style={styles.orderItem}>
          <Text variant="codeSm" color={colors.outline}>
            {String(index + 1).padStart(2, '0')}
          </Text>
          <View style={[styles.orderChip, {borderColor: item.color}]}>
            <Text variant="codeMd" color={item.color}>
              {item.label}
            </Text>
          </View>
        </View>
      ))}
    </View>
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
  arch: {gap: spacing.sm},
  orderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    alignItems: 'center',
  },
  orderItem: {
    alignItems: 'center',
    gap: 4,
  },
  orderChip: {
    minWidth: 44,
    height: 40,
    borderWidth: 1,
    borderRadius: radii.default,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
    backgroundColor: colors.surfaceContainer,
  },
});
