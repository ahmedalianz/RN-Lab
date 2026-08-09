import {RotateCcw} from 'lucide-react-native';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  CodeBlock,
  ColoredTerminal,
  ExperimentActions,
  ExperimentHeader,
  ExperimentNote,
  SectionHeader,
} from '../../../components/experiment';
import {FilterChip} from '../../../components/LabUI';
import {Text} from '../../../components/Text';
import {
  STATE_ACCENT,
  STATE_STRATEGIES,
  formatStateStore,
  mutabilityLabel,
} from '../../../experiments/javascript/stateManagement';
import {useStateManagement} from '../../../hooks/useStateManagement';
import {categoryColors, colors, radii, spacing} from '../../../theme';
import {
  StateComponentTree,
  StateDispatcher,
  StateMetricSparks,
} from './state/StatePanels';

export function StateManagementPlaygroundScreen() {
  const insets = useSafeAreaInsets();
  const {
    strategy,
    action,
    payloadText,
    setPayloadText,
    appState,
    metrics,
    logs,
    highlighted,
    error,
    selectStrategy,
    selectAction,
    dispatchAction,
    reset,
  } = useStateManagement();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        {paddingBottom: insets.bottom + spacing.lg},
      ]}>
      <ExperimentHeader
        domainLabel="REACT"
        domainColor={categoryColors.react}
        title="State Management Playground"
        description="Local vs shared vs external store — watch who re-renders."
      />

      <View style={styles.chips}>
        {STATE_STRATEGIES.map(option => (
          <FilterChip
            key={option.id}
            label={option.label}
            active={strategy === option.id}
            onPress={() => selectStrategy(option.id)}
          />
        ))}
      </View>

      <SectionHeader title="COMPONENT TREE" />
      <StateComponentTree highlighted={highlighted} />

      <SectionHeader
        title="STATE STORE"
        trailing={
          <View style={styles.mutableBadge}>
            <Text variant="labelCaps" color={STATE_ACCENT.mutable}>
              {mutabilityLabel(strategy)}
            </Text>
          </View>
        }
      />
      <CodeBlock filename="store.js" code={formatStateStore(appState)} />

      <SectionHeader title="PERFORMANCE METRICS" />
      <StateMetricSparks metrics={metrics} />

      <SectionHeader title="DISPATCHER" />
      <StateDispatcher
        action={action}
        payloadText={payloadText}
        error={error}
        onSelectAction={selectAction}
        onChangePayload={setPayloadText}
        onDispatch={dispatchAction}
      />

      <ExperimentActions
        primaryLabel="RESET STORE"
        primaryIcon={RotateCcw}
        onPrimary={reset}
      />

      <SectionHeader title="LIVE EVENT LOG" />
      <ColoredTerminal
        title="EVENTS"
        lines={logs.map(line => ({
          time: line.time,
          level: line.level,
          message: line.detail
            ? `${line.message} — ${line.detail}`
            : line.message,
          color: line.color,
        }))}
      />

      <ExperimentNote title="Strategy Note" accentColor={categoryColors.react}>
        Context notifies every consumer under the provider. An external store
        only re-renders subscribed leaves. useState/useReducer keep updates
        local to the owning component subtree.
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
  interactiveBadge: {
    borderWidth: 1,
    borderColor: STATE_ACCENT.render,
    borderRadius: radii.default,
    paddingHorizontal: spacing.xs,
    paddingVertical: 6,
  },
  mutableBadge: {
    borderWidth: 1,
    borderColor: STATE_ACCENT.mutable,
    borderRadius: radii.default,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
  },
});
