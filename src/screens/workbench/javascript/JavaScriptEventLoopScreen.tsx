import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ChevronRight, RotateCcw} from 'lucide-react-native';
import {
  ColoredTerminal,
  ExperimentActions,
  ExperimentHeader,
  QueuePanel,
  SectionHeader,
} from '../../../components/experiment';
import {Text} from '../../../components/Text';
import {useEventLoopSimulation} from '../../../hooks/useEventLoopSimulation';
import {colors, radii, spacing} from '../../../theme';
import {EventLoopPulse} from './components/EventLoopPulse';

export function JavaScriptEventLoopScreen() {
  const insets = useSafeAreaInsets();
  const {sim, nextStep, reset, clearLogs, idle, rotate} =
    useEventLoopSimulation();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        {paddingBottom: insets.bottom + spacing.lg},
      ]}>
      <ExperimentHeader
        domainLabel="JAVASCRIPT"
        title="Event Loop"
        titleColor={colors.primaryFixedDim}
        description="Step through call stack → microtasks → macrotasks."
        trailing={
          <View style={styles.runtimeBadge}>
            <View style={styles.pulse} />
            <Text variant="labelCaps" color={colors.tertiaryContainer}>
              {idle ? 'IDLE' : 'RUNTIME ACTIVE'}
            </Text>
          </View>
        }
      />

      <ExperimentActions
        primaryLabel="NEXT STEP"
        primaryIcon={ChevronRight}
        onPrimary={nextStep}
        primaryDisabled={idle}
        secondaryLabel="RESET"
        secondaryIcon={RotateCcw}
        onSecondary={reset}
      />

      <QueuePanel
        title="CALL STACK [LIFO]"
        accent={colors.tertiaryContainer}
        items={[...sim.callStack].reverse()}
      />

      <EventLoopPulse rotate={rotate} />

      <QueuePanel
        title="MICROTASK QUEUE (P1)"
        accent={colors.secondary}
        items={sim.microtasks}
      />

      <QueuePanel
        title="MACROTASK QUEUE (P2)"
        accent={colors.primaryFixedDim}
        items={sim.macrotasks}
      />

      <SectionHeader
        title="STDOUT / TRACE_LOG"
        trailing={
          <Text
            variant="codeSm"
            color={colors.primaryFixedDim}
            onPress={clearLogs}>
            clear()
          </Text>
        }
      />
      <ColoredTerminal
        title="TRACE"
        showCursor
        lines={sim.logs.map(line => ({
          level: line.tag,
          message: line.message,
          color: line.color,
        }))}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.background},
  content: {
    padding: spacing.marginMobile,
    gap: spacing.sm,
  },
  runtimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radii.default,
    paddingHorizontal: spacing.xs,
    paddingVertical: 6,
  },
  pulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.tertiaryContainer,
  },
});
