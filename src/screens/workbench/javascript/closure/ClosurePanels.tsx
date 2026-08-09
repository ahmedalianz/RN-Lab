import {Pressable, StyleSheet, View} from 'react-native';
import {Globe2} from 'lucide-react-native';
import {CodeBlock} from '../../../../components/experiment';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';
import {CODE_LINES} from '../../../../experiments/javascript/closureScope';
import {colors, radii, spacing} from '../../../../theme';

const ACCENT = colors.secondary;
const ACTIVE = colors.tertiaryContainer;

export function ClosureCodePanel({
  stepHighlight,
  onCallFunction,
  onReset,
}: {
  stepHighlight: number;
  onCallFunction: () => void;
  onReset: () => void;
}) {
  return (
    <CodeBlock
      filename="counter.js"
      actions={
        <View style={styles.codeBtns}>
          <CodeAction label="CALL FUNCTION" onPress={onCallFunction} accent />
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
  pressed: {opacity: 0.85},
});
