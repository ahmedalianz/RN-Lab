import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SplashBootLog, SplashBrand} from '../../components/splash';
import {useSplashSequence} from '../../hooks/useSplashSequence';
import type {RootStackParamList} from '../../navigation/types';
import {colors, spacing} from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({navigation}: Props) {
  const {
    bootLines,
    rootStyle,
    logoStyle,
    titleStyle,
    subtitleStyle,
    lineStyles,
  } = useSplashSequence({
    onFinished: () => navigation.replace('Main'),
  });

  return (
    <Animated.View style={[styles.root, rootStyle]}>
      <SplashBrand
        logoStyle={logoStyle}
        titleStyle={titleStyle}
        subtitleStyle={subtitleStyle}
      />
      <SplashBootLog lines={bootLines} lineStyles={lineStyles} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.marginMobile,
  },
});
