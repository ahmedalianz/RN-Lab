import {Image, StyleSheet, View} from 'react-native';
import Animated, {type AnimatedStyle} from 'react-native-reanimated';
import type {ViewStyle} from 'react-native';
import {Text} from '../Text';
import {colors, radii, spacing} from '../../theme';

type Props = {
  logoStyle: AnimatedStyle<ViewStyle>;
  titleStyle: AnimatedStyle<ViewStyle>;
  subtitleStyle: AnimatedStyle<ViewStyle>;
};

export function SplashBrand({logoStyle, titleStyle, subtitleStyle}: Props) {
  return (
    <View style={styles.brand}>
      <Animated.View style={[styles.logoWrap, logoStyle]}>
        <Image
          source={require('../../../assets/bootsplash/logo.png')}
          style={styles.logo}
          accessibilityLabel="RN Lab logo"
        />
      </Animated.View>
      <Animated.View style={titleStyle}>
        <Text variant="headlineLg" color={colors.primaryFixedDim}>
          RN Lab
        </Text>
      </Animated.View>
      <Animated.View style={subtitleStyle}>
        <Text variant="labelCaps" color={colors.outline}>
          Mobile Engineering Laboratory
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  brand: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoWrap: {
    marginBottom: spacing.xs,
    borderRadius: radii.xl,
    overflow: 'hidden',
  },
  logo: {
    width: 96,
    height: 96,
  },
});
