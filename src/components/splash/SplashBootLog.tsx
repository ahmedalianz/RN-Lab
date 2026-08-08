import {StyleSheet, View} from 'react-native';
import Animated, {type AnimatedStyle} from 'react-native-reanimated';
import type {ViewStyle} from 'react-native';
import {Text} from '../Text';
import {colors, radii, spacing} from '../../theme';

type Props = {
  lines: readonly string[];
  lineStyles: Array<AnimatedStyle<ViewStyle>>;
};

export function SplashBootLog({lines, lineStyles}: Props) {
  return (
    <View style={styles.panel}>
      <Text variant="labelCaps" color={colors.outline}>
        BOOT LOG
      </Text>
      {lines.map((line, index) => (
        <Animated.View key={line} style={lineStyles[index]}>
          <Text variant="codeSm" color={colors.primaryFixedDim}>
            {'> '}
            <Text variant="codeSm" color={colors.onSurfaceVariant}>
              {line}
            </Text>
          </Text>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    width: '100%',
    maxWidth: 320,
    marginTop: spacing.xl,
    backgroundColor: colors.terminal,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    gap: spacing.xs,
  },
});
