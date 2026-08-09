import {useCallback, useEffect, useRef, useState} from 'react';
import {
  DEFAULT_ITEM_COUNT,
  IDLE_METRICS,
  INITIAL_LOGS,
  ITEM_MAX,
  ITEM_MIN,
  ITEM_STEP,
  PHASE_STEPS,
  clampItemCount,
  formatMetrics,
  stampTime,
  type HermesHighlight,
  type HermesLogLine,
  type HermesMetrics,
  type HermesPhase,
} from '../experiments/javascript/hermesRuntime';

export function useHermesRuntime() {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<HermesPhase>('idle');
  const [itemCount, setItemCountState] = useState(DEFAULT_ITEM_COUNT);
  const [metrics, setMetrics] = useState<HermesMetrics>(IDLE_METRICS);
  const [logs, setLogs] = useState<HermesLogLine[]>(INITIAL_LOGS);
  const [highlight, setHighlight] = useState<HermesHighlight>('js');
  const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const runningRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      runningRef.current = false;
      clearTimers();
    };
  }, [clearTimers]);

  const setItemCount = useCallback((value: number) => {
    if (runningRef.current) {
      return;
    }
    setItemCountState(clampItemCount(value));
  }, []);

  const adjustItemCount = useCallback(
    (delta: number) => {
      if (runningRef.current) {
        return;
      }
      setItemCountState(prev => clampItemCount(prev + delta));
    },
    [],
  );

  const reset = useCallback(() => {
    runningRef.current = false;
    clearTimers();
    setActive(false);
    setPhase('idle');
    setHighlight(null);
    setMetrics(IDLE_METRICS);
    setLogs(INITIAL_LOGS);
  }, [clearTimers]);

  const runBenchmark = useCallback(() => {
    if (runningRef.current) {
      return;
    }

    runningRef.current = true;
    clearTimers();
    setActive(true);
    setPhase('compile');
    setHighlight('parser');
    setMetrics(IDLE_METRICS);
    setLogs(prev => [
      ...prev.slice(-4),
      {
        time: stampTime(),
        level: 'INFO',
        message: `Starting Hermes simulation · N=${itemCount}`,
      },
    ]);

    let elapsed = 0;
    PHASE_STEPS.forEach(step => {
      elapsed += step.delayMs;
      const timer = setTimeout(() => {
        if (!runningRef.current) {
          return;
        }
        setPhase(step.phase);
        setHighlight(step.highlight);
        setMetrics(step.metrics(itemCount));
        setLogs(prev => [
          ...prev.slice(-10),
          {
            time: stampTime(),
            level: step.level,
            message: step.message(itemCount),
          },
        ]);
        if (step.phase === 'done') {
          runningRef.current = false;
          setActive(false);
        }
      }, elapsed);
      timersRef.current.push(timer);
    });
  }, [clearTimers, itemCount]);

  return {
    active,
    phase,
    itemCount,
    setItemCount,
    adjustItemCount,
    canAdjust: !active,
    itemBounds: {min: ITEM_MIN, max: ITEM_MAX, step: ITEM_STEP},
    metrics,
    displayMetrics: formatMetrics(metrics),
    logs,
    highlight,
    runBenchmark,
    reset,
  };
}
