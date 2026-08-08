import {Pressable, StyleSheet, View} from 'react-native';
import {
  AlertTriangle,
  Globe2,
  Plus,
  Recycle,
} from 'lucide-react-native';
import {CodeBlock} from '../../../../components/experiment';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';
import {
  CODE_LINES,
  LEAK_OPTIONS,
  type LeakKind,
} from '../../../../experiments/javascript/closureMemory';
import {colors, radii, spacing} from '../../../../theme';

const ACCENT = colors.secondary;
const ACTIVE = colors.tertiaryContainer;
const LEAK = colors.error;

export function ClosureCodePanel({
  stepHighlight,
  onRun,
  onStep,
  onReset,
}: {
  stepHighlight: number;
  onRun: () => void;
  onStep: () => void;
  onReset: () => void;
}) {
  return (
    <CodeBlock
      filename="counter.js"
      actions={
        <View style={styles.codeBtns}>
          <CodeAction label="RUN" onPress={onRun} />
          <CodeAction label="STEP" onPress={onStep} accent />
          <CodeAction label="RESET" onPress={onReset} />
        </View>
      }>
      {CODE_LINES.map((line, index) => (
        <View
          key={`line-${index}`}
          style={[
            styles.codeLine,
            stepHighlight === index && styles.codeLineActive,
          ]}>
          <Text variant="codeSm" color={colors.outline}>
            {String(index + 1).padStart(2, ' ')}
          </Text>
          <Text variant="codeSm" color={line.color} style={styles.codeText}>
            {line.text || ' '}
          </Text>
        </View>
      ))}
    </CodeBlock>
  );
}

export function HeapMemoryMap() {
  return (
    <>
      <View style={styles.heapMap}>
        <View style={styles.heapNode}>
          <Text variant="labelCaps" color={colors.onSurfaceVariant}>
            CLOSURE @a3f82
          </Text>
        </View>
        <View style={styles.heapDot} />
        <View style={styles.heapNode}>
          <Text variant="labelCaps" color={colors.onSurfaceVariant}>
            FUNCTION @c1a94
          </Text>
        </View>
      </View>
      <Text variant="labelCaps" color={colors.outline}>
        HEAP MEMORY MAP
      </Text>
    </>
  );
}

function CodeAction({
  label,
  onPress,
  accent,
}: {
  label: string;
  onPress: () => void;
  accent?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.codeAction,
        accent && styles.codeActionAccent,
        pressed && styles.pressed,
      ]}>
      <Text
        variant="labelCaps"
        color={accent ? colors.onPrimary : colors.outline}>
        {label}
      </Text>
    </Pressable>
  );
}

export function ScopeChain({count}: {count: number}) {
  return (
    <View style={styles.scopeCard}>
      <View style={styles.scopeNode}>
        <Icon icon={Globe2} size={14} color={colors.outline} />
        <Text variant="codeMd" color={colors.onSurfaceVariant}>
          GLOBAL SCOPE
        </Text>
      </View>
      <View style={styles.scopeConnector} />
      <View style={styles.scopeNode}>
        <Text variant="codeMd" color={colors.onSurfaceVariant}>
          createCounter() Environment
        </Text>
      </View>
      <View style={styles.scopeBranch}>
        <View style={styles.scopeBranchLine} />
        <View style={styles.closureBox}>
          <View style={styles.closureHeader}>
            <Text variant="labelCaps" color={ACTIVE}>
              Closure Scope
            </Text>
            <View style={styles.activeBadge}>
              <Text variant="labelCaps" color={ACTIVE}>
                ACTIVE
              </Text>
            </View>
          </View>
          <View style={styles.capturedRow}>
            <Text variant="codeMd" color={colors.onSurfaceVariant}>
              count
            </Text>
            <Text variant="codeMd" color={ACCENT}>
              {count}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export function Inspector({count}: {count: number}) {
  return (
    <View style={styles.inspector}>
      <InspectorRow label="Function" value="anonymous" />
      <InspectorRow
        label="Environment"
        value="createCounter"
        valueColor={colors.primaryFixedDim}
      />
      <View style={styles.inspectorRow}>
        <Text variant="codeSm" color={colors.outline}>
          Captured
        </Text>
        <Text variant="codeSm" color={colors.onSurface}>
          count{' '}
          <Text variant="codeSm" color={colors.outline}>
            (number)
          </Text>{' '}
          <Text variant="codeSm" color={ACCENT}>
            {count}
          </Text>
        </Text>
      </View>
      <View style={styles.inspectorRow}>
        <Text variant="codeSm" color={colors.outline}>
          Status
        </Text>
        <View style={styles.retainedBadge}>
          <View style={[styles.dot, {backgroundColor: ACCENT}]} />
          <Text variant="labelCaps" color={ACCENT}>
            RETAINED
          </Text>
        </View>
      </View>
    </View>
  );
}

export function LeakSimulation({
  leakKind,
  onSelectLeak,
  onCreateLeak,
  onRelease,
  spark,
}: {
  leakKind: LeakKind;
  onSelectLeak: (kind: LeakKind) => void;
  onCreateLeak: () => void;
  onRelease: () => void;
  spark: number[];
}) {
  const maxSpark = Math.max(...spark);

  return (
    <View style={styles.leakRoot}>
      <View style={styles.leakHeader}>
        <Text variant="labelCaps" color={colors.outline}>
          LEAK SIMULATION
        </Text>
        <Icon icon={AlertTriangle} size={14} color={LEAK} />
      </View>
      <View style={styles.leakOptions}>
        {LEAK_OPTIONS.map(option => {
          const selected = leakKind === option.id;
          return (
            <Pressable
              key={option.id}
              onPress={() => onSelectLeak(option.id)}
              style={styles.leakOption}>
              <View style={[styles.radio, selected && styles.radioSelected]} />
              <Text
                variant="codeSm"
                color={selected ? colors.onSurface : colors.outline}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.leakActions}>
        <Pressable
          onPress={onCreateLeak}
          style={({pressed}) => [
            styles.createLeakBtn,
            pressed && styles.pressed,
          ]}>
          <Icon icon={Plus} size={16} color={LEAK} />
          <Text variant="labelCaps" color={LEAK}>
            CREATE LEAK
          </Text>
        </Pressable>
        <View style={styles.sparkline}>
          {spark.map((value, index) => (
            <View
              key={`spark-${index}`}
              style={[
                styles.sparkBar,
                {height: Math.max(4, (value / maxSpark) * 28)},
              ]}
            />
          ))}
        </View>
      </View>
      <Pressable
        onPress={onRelease}
        style={({pressed}) => [styles.releaseBtn, pressed && styles.pressed]}>
        <Icon icon={Recycle} size={16} color={colors.onSurfaceVariant} />
        <Text variant="labelCaps" color={colors.onSurfaceVariant}>
          RELEASE REFERENCES
        </Text>
      </Pressable>
      <Text variant="codeSm" color={colors.outline}>
        Releasing references makes closures eligible for Garbage Collection
        (GC).
      </Text>
    </View>
  );
}

function InspectorRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View style={styles.inspectorRow}>
      <Text variant="codeSm" color={colors.outline}>
        {label}
      </Text>
      <Text variant="codeSm" color={valueColor ?? colors.onSurface}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  codeBtns: {
    flexDirection: 'row',
    gap: 6,
  },
  codeAction: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  codeActionAccent: {
    backgroundColor: colors.primaryFixedDim,
    borderColor: colors.primaryFixedDim,
  },
  codeLine: {
    flexDirection: 'row',
    gap: spacing.xs,
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: radii.sm,
  },
  codeLineActive: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  codeText: {flex: 1},
  heapMap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  heapNode: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radii.default,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surfaceContainer,
  },
  heapDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.outline,
  },
  scopeCard: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    gap: spacing.xs,
  },
  scopeNode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scopeConnector: {
    width: 1,
    height: 12,
    marginLeft: 6,
    backgroundColor: colors.outlineVariant,
  },
  scopeBranch: {
    marginLeft: 6,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  scopeBranchLine: {
    width: 12,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.outlineVariant,
    height: 20,
  },
  closureBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: ACTIVE,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    backgroundColor: colors.surfaceContainerLow,
    gap: spacing.xs,
  },
  closureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeBadge: {
    borderWidth: 1,
    borderColor: ACTIVE,
    borderRadius: radii.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  capturedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inspector: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    gap: spacing.xs,
  },
  inspectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  retainedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: ACCENT,
    borderRadius: radii.default,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  leakRoot: {
    gap: spacing.sm,
  },
  leakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  leakOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  leakOption: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  radio: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  radioSelected: {
    borderColor: LEAK,
    backgroundColor: LEAK,
  },
  leakActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  createLeakBtn: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: LEAK,
    borderRadius: radii.default,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  sparkline: {
    width: 64,
    height: 32,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  sparkBar: {
    flex: 1,
    backgroundColor: LEAK,
    borderRadius: 1,
    opacity: 0.85,
  },
  releaseBtn: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    backgroundColor: colors.surfaceContainer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  pressed: {opacity: 0.85},
});
