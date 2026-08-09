import {Pressable, StyleSheet, View} from 'react-native';
import {Minus, Plus} from 'lucide-react-native';
import {FilterChip} from '../../../../components/LabUI';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';
import {ITEM_PRESETS} from '../../../../experiments/javascript/hermesRuntime';
import {colors, radii, spacing} from '../../../../theme';

type Props = {
  itemCount: number;
  canAdjust: boolean;
  step: number;
  onSelectPreset: (value: number) => void;
  onAdjust: (delta: number) => void;
};

export function HermesWorkloadControls({
  itemCount,
  canAdjust,
  step,
  onSelectPreset,
  onAdjust,
}: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text variant="labelCaps" color={colors.outline}>
          WORKLOAD SIZE
        </Text>
        <Text variant="codeMd" color={colors.primaryFixedDim}>
          N = {itemCount.toLocaleString()}
        </Text>
      </View>

      <View style={styles.stepper}>
        <Pressable
          accessibilityLabel="Decrease item count"
          disabled={!canAdjust}
          onPress={() => onAdjust(-step)}
          style={({pressed}) => [
            styles.stepBtn,
            !canAdjust && styles.disabled,
            pressed && canAdjust && styles.pressed,
          ]}>
          <Icon icon={Minus} size={16} color={colors.onSurface} />
        </Pressable>
        <View style={styles.countBox}>
          <Text variant="metricDisplay" style={styles.countValue}>
            {itemCount.toLocaleString()}
          </Text>
          <Text variant="codeSm" color={colors.outline}>
            array items
          </Text>
        </View>
        <Pressable
          accessibilityLabel="Increase item count"
          disabled={!canAdjust}
          onPress={() => onAdjust(step)}
          style={({pressed}) => [
            styles.stepBtn,
            !canAdjust && styles.disabled,
            pressed && canAdjust && styles.pressed,
          ]}>
          <Icon icon={Plus} size={16} color={colors.onSurface} />
        </Pressable>
      </View>

      <View style={styles.presets}>
        {ITEM_PRESETS.map(preset => (
          <FilterChip
            key={preset}
            label={preset.toLocaleString()}
            active={itemCount === preset}
            onPress={canAdjust ? () => onSelectPreset(preset) : undefined}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    backgroundColor: colors.surfaceContainer,
    padding: spacing.containerPadding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stepBtn: {
    width: 44,
    height: 44,
    borderRadius: radii.default,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBox: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  countValue: {
    fontSize: 28,
  },
  presets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  disabled: {opacity: 0.4},
  pressed: {opacity: 0.85},
});
