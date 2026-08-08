import {useEffect} from 'react';
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import BootSplash from 'react-native-bootsplash';
import {SPLASH_BOOT_LINES, SPLASH_TIMING} from '../experiments/core/splash';

type Options = {
  onFinished: () => void;
};

export function useSplashSequence({onFinished}: Options) {
  const rootOpacity = useSharedValue(1);
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.82);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(14);
  const subtitleOpacity = useSharedValue(0);
  const line0 = useSharedValue(0);
  const line1 = useSharedValue(0);
  const line2 = useSharedValue(0);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{scale: logoScale.value}],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{translateY: titleTranslateY.value}],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  const rootStyle = useAnimatedStyle(() => ({
    opacity: rootOpacity.value,
  }));

  const lineStyles = [
    useAnimatedStyle(() => ({opacity: line0.value})),
    useAnimatedStyle(() => ({opacity: line1.value})),
    useAnimatedStyle(() => ({opacity: line2.value})),
  ];

  useEffect(() => {
    let cancelled = false;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
      if (!cancelled) {
        onFinished();
      }
    };

    const fadeOut = () => {
      rootOpacity.value = withTiming(
        0,
        {
          duration: SPLASH_TIMING.exitMs,
          easing: Easing.out(Easing.cubic),
        },
        finished => {
          if (finished) {
            runOnJS(finish)();
          }
        },
      );
    };

    const startSequence = async () => {
      await BootSplash.hide({fade: true});
      if (cancelled) {
        return;
      }

      logoOpacity.value = withTiming(1, {
        duration: SPLASH_TIMING.logoMs,
        easing: Easing.out(Easing.cubic),
      });
      logoScale.value = withTiming(1, {
        duration: SPLASH_TIMING.logoMs,
        easing: Easing.out(Easing.back(1.4)),
      });

      titleOpacity.value = withDelay(
        SPLASH_TIMING.titleDelayMs,
        withTiming(1, {
          duration: SPLASH_TIMING.titleMs,
          easing: Easing.out(Easing.cubic),
        }),
      );
      titleTranslateY.value = withDelay(
        SPLASH_TIMING.titleDelayMs,
        withTiming(0, {
          duration: SPLASH_TIMING.titleMs,
          easing: Easing.out(Easing.cubic),
        }),
      );
      subtitleOpacity.value = withDelay(
        SPLASH_TIMING.titleDelayMs + 120,
        withTiming(1, {
          duration: SPLASH_TIMING.titleMs,
          easing: Easing.out(Easing.cubic),
        }),
      );

      const linesStart =
        SPLASH_TIMING.titleDelayMs + SPLASH_TIMING.titleMs + 80;
      const lineValues = [line0, line1, line2];
      lineValues.forEach((opacity, index) => {
        opacity.value = withDelay(
          linesStart + index * SPLASH_TIMING.lineStaggerMs,
          withTiming(1, {
            duration: SPLASH_TIMING.lineMs,
            easing: Easing.out(Easing.cubic),
          }),
        );
      });

      const totalMs =
        linesStart +
        SPLASH_BOOT_LINES.length * SPLASH_TIMING.lineStaggerMs +
        SPLASH_TIMING.lineMs +
        SPLASH_TIMING.holdMs;

      exitTimer = setTimeout(fadeOut, totalMs);
    };

    const safety = setTimeout(fadeOut, 4500);
    startSequence().catch(fadeOut);

    return () => {
      cancelled = true;
      clearTimeout(safety);
      if (exitTimer) {
        clearTimeout(exitTimer);
      }
    };
    // Intentionally run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    bootLines: SPLASH_BOOT_LINES,
    rootStyle,
    logoStyle,
    titleStyle,
    subtitleStyle,
    lineStyles,
  };
}
