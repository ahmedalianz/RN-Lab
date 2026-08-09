import {Pressable, StyleSheet, View} from 'react-native';
import {
  ArrowLeftRight,
  Plus,
  RotateCcw,
  RefreshCw,
} from 'lucide-react-native';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';
import {
  RECONCILE_ACCENT,
  type RenderNode,
  type RenderNodeId,
} from '../../../../experiments/javascript/renderingReconciliation';
import {colors, radii, spacing} from '../../../../theme';

export function VirtualDomTree({
  tree,
  activeNodeId,
}: {
  tree: RenderNode[];
  activeNodeId: RenderNodeId | null;
}) {
  return (
    <View style={styles.tree}>
      {tree.map(node => {
        const active = node.id === activeNodeId;
        return (
          <View
            key={node.id}
            style={[
              styles.node,
              {marginLeft: node.depth * 18},
              active && {
                borderColor: RECONCILE_ACCENT.primary,
                backgroundColor: colors.surfaceContainerHigh,
              },
            ]}>
            <Text
              variant="codeMd"
              color={active ? RECONCILE_ACCENT.primary : colors.onSurface}>
              {node.label}
            </Text>
            <Text variant="codeSm" color={colors.outline}>
              Renders: {node.renders} · {node.lastMs.toFixed(1)}ms
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export function ReconcileActions({
  onIncrement,
  onChangeProps,
  onForce,
  onReset,
}: {
  onIncrement: () => void;
  onChangeProps: () => void;
  onForce: () => void;
  onReset: () => void;
}) {
  return (
    <View style={styles.actions}>
      <ActionButton
        label="INCREMENT STATE [Value]"
        icon={Plus}
        color={RECONCILE_ACCENT.primary}
        onPress={onIncrement}
      />
      <ActionButton
        label="CHANGE PROPS [Action]"
        icon={ArrowLeftRight}
        color={colors.onSurfaceVariant}
        onPress={onChangeProps}
      />
      <ActionButton
        label="FORCE RENDER [Full Render]"
        icon={RefreshCw}
        color={RECONCILE_ACCENT.render}
        onPress={onForce}
      />
      <ActionButton
        label="RESET"
        icon={RotateCcw}
        color={RECONCILE_ACCENT.danger}
        onPress={onReset}
      />
    </View>
  );
}

function ActionButton({
  label,
  icon,
  color,
  onPress,
}: {
  label: string;
  icon: typeof Plus;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.actionBtn,
        {borderColor: color},
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}>
      <Icon icon={icon} size={16} color={color} />
      <Text variant="labelCaps" color={color}>
        {label}
      </Text>
    </Pressable>
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
    gap: 2,
    backgroundColor: colors.surfaceContainerLowest,
  },
  actions: {gap: spacing.xs},
  actionBtn: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: radii.default,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceContainer,
  },
  pressed: {opacity: 0.85},
});
