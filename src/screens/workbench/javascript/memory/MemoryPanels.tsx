import {Pressable, StyleSheet, View} from 'react-native';
import {AlertTriangle, Plus, Recycle, RotateCcw} from 'lucide-react-native';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';
import {
  LEAK_OPTIONS,
  type LeakKind,
} from '../../../../experiments/javascript/memoryRetention';
import {colors, radii, spacing} from '../../../../theme';

const LEAK = colors.error;

export function LeakSimulation({
  leakKind,
  onSelectLeak,
  onCreateLeak,
  onRelease,
  onReset,
  spark,
}: {
  leakKind: LeakKind;
  onSelectLeak: (kind: LeakKind) => void;
  onCreateLeak: () => void;
  onRelease: () => void;
  onReset: () => void;
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
      <Pressable
        onPress={onReset}
        style={({pressed}) => [styles.releaseBtn, pressed && styles.pressed]}>
        <Icon icon={RotateCcw} size={16} color={colors.onSurfaceVariant} />
        <Text variant="labelCaps" color={colors.onSurfaceVariant}>
          RESET SIMULATION
        </Text>
      </Pressable>
      <Text variant="codeSm" color={colors.outline}>
        Releasing references makes retained objects eligible for Garbage
        Collection (GC). It doesn’t instantly reclaim the full leaked amount.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
