import {Animated, StyleSheet, View} from 'react-native';
import {RefreshCw} from 'lucide-react-native';
import {Icon} from '../../../../components/Icon';
import {Text} from '../../../../components/Text';
import {colors, radii, spacing} from '../../../../theme';

type Props = {
  rotate: Animated.AnimatedInterpolation<string | number>;
};

export function EventLoopPulse({rotate}: Props) {
  return (
    <View style={styles.loop}>
      <Animated.View style={{transform: [{rotate}]}}>
        <Icon icon={RefreshCw} size={28} color={colors.tertiaryContainer} />
      </Animated.View>
      <Text variant="headlineSm" color={colors.tertiaryContainer}>
        EVENT LOOP
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loop: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.outlineVariant,
    borderRadius: radii.xl,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
    marginVertical: spacing.xs,
  },
});
