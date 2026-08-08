import {useCallback, useEffect, useRef, useState} from 'react';
import {
  BENCHMARK_DELAY_MS,
  BENCHMARK_RESULT_METRICS,
  IDLE_METRICS,
  INITIAL_LOGS,
  stampTime,
  type HermesHighlight,
  type HermesLogLine,
  type HermesMetrics,
} from '../experiments/javascript/hermesRuntime';

export function useHermesRuntime() {
  const [active, setActive] = useState(true);
  const [metrics, setMetrics] = useState<HermesMetrics>(IDLE_METRICS);
  const [logs, setLogs] = useState<HermesLogLine[]>(INITIAL_LOGS);
  const [highlight, setHighlight] = useState<HermesHighlight>('runtime');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const runBenchmark = useCallback(() => {
    setActive(true);
    setHighlight('runtime');
    setLogs(prev => [
      ...prev.slice(-6),
      {
        time: stampTime(),
        level: 'INFO',
        message: 'Running Array Ops [1000]...',
      },
    ]);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setMetrics(BENCHMARK_RESULT_METRICS);
      setHighlight('rn');
      setLogs(prev => [
        ...prev,
        {
          time: stampTime(),
          level: 'SUCCESS',
          message: 'Execution completed in 4.2ms.',
        },
      ]);
    }, BENCHMARK_DELAY_MS);
  }, []);

  return {
    active,
    metrics,
    logs,
    highlight,
    setHighlight,
    runBenchmark,
  };
}
