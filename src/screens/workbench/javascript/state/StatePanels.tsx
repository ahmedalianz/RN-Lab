import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {Play} from 'lucide-react-native';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';
import {
  STATE_ACCENT,
  STATE_ACTIONS,
  STATE_TREE,
  type StateActionType,
  type StateMetrics,
  type StateNodeId,
} from '../../../../experiments/javascript/stateManagement';
import {colors, fonts, radii, spacing} from '../../../../theme';

export function StateComponentTree({
  highlighted,
}: {
  highlighted: StateNodeId[];
}) {
  return (
    <View style={styles.tree}>
      {STATE_TREE.map(node => {
        const active = highlighted.includes(node.id);
        return (
          <View
            key={node.id}
            style={[
              styles.node,
              {marginLeft: node.depth * 18},
              active && {
                borderColor: STATE_ACCENT.render,
                backgroundColor: colors.surfaceContainerHigh,
              },
            ]}>
            <Text
              variant="codeMd"
              color={active ? STATE_ACCENT.render : colors.onSurface}>
              {node.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export function StateMetricSparks({metrics}: {metrics: StateMetrics}) {
  return (
    <View style={styles.metricsRow}>
      <SparkStat
        label="NOTIFIED"
        value={String(metrics.notified)}
        spark={metrics.sparkNotified}
        color={colors.onSurface}
      />
      <SparkStat
        label="RE-RENDERED"
        value={String(metrics.reRendered)}
        spark={metrics.sparkRendered}
        color={STATE_ACCENT.render}
      />
      <SparkStat
        label="UPDATE TIME"
        value={`${metrics.updateMs.toFixed(1)}ms`}
        spark={metrics.sparkTime}
        color={STATE_ACCENT.time}
      />
    </View>
  );
}

function SparkStat({
  label,
  value,
  spark,
  color,
}: {
  label: string;
  value: string;
  spark: number[];
  color: string;
}) {
  const max = Math.max(...spark, 1);
  return (
    <View style={styles.stat}>
      <Text variant="labelCaps" color={colors.outline}>
        {label}
      </Text>
      <Text variant="metricDisplay" color={color}>
        {value}
      </Text>
      <View style={styles.sparkRow}>
        {spark.map((point, index) => (
          <View
            key={`${label}-${index}`}
            style={[
              styles.sparkBar,
              {
                height: Math.max(3, (point / max) * 18),
                backgroundColor: color,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

export function StateDispatcher({
  action,
  payloadText,
  error,
  onSelectAction,
  onChangePayload,
  onDispatch,
}: {
  action: StateActionType;
  payloadText: string;
  error: string | null;
  onSelectAction: (id: StateActionType) => void;
  onChangePayload: (value: string) => void;
  onDispatch: () => void;
}) {
  return (
    <View style={styles.dispatcher}>
      <Text variant="labelCaps" color={colors.outline}>
        ACTION TYPE
      </Text>
      <View style={styles.actionChips}>
        {STATE_ACTIONS.map(item => {
          const active = item.id === action;
          return (
            <Pressable
              key={item.id}
              onPress={() => onSelectAction(item.id)}
              style={[styles.actionChip, active && styles.actionChipActive]}>
              <Text
                variant="codeSm"
                color={active ? STATE_ACCENT.primary : colors.outline}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text variant="labelCaps" color={colors.outline}>
        PAYLOAD (JSON)
      </Text>
      <TextInput
        value={payloadText}
        onChangeText={onChangePayload}
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.payload}
        placeholderTextColor={colors.outline}
      />
      {error ? (
        <Text variant="codeSm" color={colors.error}>
          {error}
        </Text>
      ) : null}
      <Pressable
        onPress={onDispatch}
        style={({pressed}) => [
          styles.dispatchBtn,
          pressed && styles.pressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Dispatch action">
        <Icon icon={Play} size={16} color={colors.onPrimary} />
        <Text variant="labelCaps" color={colors.onPrimary}>
          DISPATCH ACTION
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tree: {
    gap: spacing.xs,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
  },
  node: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radii.default,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surfaceContainerLowest,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.xs,
    gap: 4,
  },
  sparkRow: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  sparkBar: {
    flex: 1,
    borderRadius: 1,
    opacity: 0.85,
  },
  dispatcher: {
    gap: spacing.xs,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
  },
  actionChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  actionChip: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radii.default,
    paddingHorizontal: spacing.xs,
    paddingVertical: 6,
  },
  actionChipActive: {
    borderColor: STATE_ACCENT.primary,
    backgroundColor: colors.surfaceContainerHigh,
  },
  payload: {
    minHeight: 88,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radii.default,
    padding: spacing.xs,
    color: colors.onSurface,
    fontFamily: fonts.mono.regular,
    fontSize: 12,
    textAlignVertical: 'top',
    backgroundColor: colors.surfaceContainerLowest,
  },
  dispatchBtn: {
    minHeight: 44,
    borderRadius: radii.default,
    backgroundColor: colors.primaryFixedDim,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  pressed: {opacity: 0.85},
});
