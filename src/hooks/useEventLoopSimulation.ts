import {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {
  INITIAL_STATE,
  advanceEventLoop,
  isEventLoopIdle,
  type EventLoopState,
} from '../experiments/javascript/eventLoop';

export function useEventLoopSimulation() {
  const [sim, setSim] = useState<EventLoopState>(INITIAL_STATE);
  const spin = useRef(new Animated.Value(0)).current;
  const spinLoop = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    return () => {
      spinLoop.current?.stop();
    };
  }, []);

  const rotateIcon = useCallback(() => {
    spinLoop.current?.stop();
    spin.setValue(0);
    spinLoop.current = Animated.timing(spin, {
      toValue: 1,
      duration: 600,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    spinLoop.current.start();
  }, [spin]);

  const nextStep = useCallback(() => {
    rotateIcon();
    setSim(prev => advanceEventLoop(prev));
  }, [rotateIcon]);

  const reset = useCallback(() => {
    spinLoop.current?.stop();
    spin.setValue(0);
    setSim(INITIAL_STATE);
  }, [spin]);

  const clearLogs = useCallback(() => {
    setSim(prev => ({...prev, logs: []}));
  }, []);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const idle = isEventLoopIdle(sim);

  return {
    sim,
    nextStep,
    reset,
    clearLogs,
    idle,
    rotate,
  };
}
