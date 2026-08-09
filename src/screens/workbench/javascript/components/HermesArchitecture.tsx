import {StyleSheet, View} from 'react-native';
import {Text} from '../../../../components/Text';
import {
  HERMES_ACCENT,
  type HermesHighlight,
} from '../../../../experiments/javascript/hermesRuntime';
import {colors, radii, spacing} from '../../../../theme';

type Props = {
  highlight: HermesHighlight;
};

export function HermesArchitecture({highlight, }: Props) {
  return (
    <View style={styles.arch}>
      <View style={styles.archRow}>
        <ArchNode label="JS" active={highlight === 'js'}/>
        <ArchArrow horizontal />
        <ArchNode
          label="Parser"
          active={highlight === 'parser'}
        />
        <ArchArrow horizontal />
        <ArchNode
          label="Bytecode"
          active={highlight === 'bytecode'}
        />
      </View>
      <View style={styles.archMid}>
        <View style={styles.archDownCol}>
          <ArchArrow />
          <ArchNode
            label="Runtime"
            active={highlight === 'runtime'}
          />
          <ArchArrow />
          <ArchNode
            label="React Native"
            active={highlight === 'rn'}
          />
        </View>
        <View style={styles.archSide}>
          <ArchArrow horizontal />
          <ArchNode
            label="Memory / GC"
            active={highlight === 'memory'}
          />
        </View>
      </View>
    </View>
  );
}

function ArchNode({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <View style={[styles.archNode, active && styles.archNodeActive]}>
      <Text
        variant="codeSm"
        color={active ? HERMES_ACCENT.active : colors.onSurfaceVariant}>
        {label}
      </Text>
    </View>
  );
}

function ArchArrow({horizontal}: {horizontal?: boolean}) {
  return (
    <View style={horizontal ? styles.arrowHorizontal : styles.arrowVertical} />
  );
}

const styles = StyleSheet.create({
  arch: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.md,
    gap: spacing.sm,
  },
  archRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  archMid: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    paddingLeft: spacing.md,
  },
  archDownCol: {
    alignItems: 'center',
    gap: 4,
  },
  archSide: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 36,
    gap: 4,
  },
  archNode: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radii.default,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surfaceContainerLow,
  },
  archNodeActive: {
    borderColor: HERMES_ACCENT.active,
  },
  arrowHorizontal: {
    width: 16,
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
  arrowVertical: {
    width: 1,
    height: 14,
    backgroundColor: colors.outlineVariant,
  },
});
