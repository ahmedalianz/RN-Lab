import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ExperimentHeader,
  ExperimentNote,
  SectionHeader,
} from '../../../components/experiment';
import { useClosureScope } from '../../../hooks/useClosureScope';
import { colors, spacing } from '../../../theme';
import {
  ClosureCodePanel,
  Inspector,
  ScopeChain,
} from './closure/ClosurePanels';

export function ClosureScopeScreen() {
  const insets = useSafeAreaInsets();
  const { count, stepHighlight, callFunction, reset } = useClosureScope();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + spacing.lg },
      ]}
    >
      <ExperimentHeader
        domainLabel="JAVASCRIPT"
        title="CLOSURES"
        statusLabel="READY"
        statusColor={colors.statusMastered}
        description="Inspect lexical scope and captured variables."
      />

      <ClosureCodePanel
        stepHighlight={stepHighlight}
        onCallFunction={callFunction}
        onReset={reset}
      />

      <SectionHeader title="SCOPE CHAIN" />
      <ScopeChain count={count} />

      <SectionHeader title="INSPECTOR" />
      <Inspector count={count} />

      <ExperimentNote title="Core Principle">
        A closure is a function that retains access to variables from its
        lexical environment after the outer function has returned. Those
        captured bindings stay alive as long as the closure is reachable.
      </ExperimentNote>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: spacing.marginMobile,
    gap: spacing.sm,
  },
});
