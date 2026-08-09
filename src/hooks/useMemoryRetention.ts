import {useCallback, useMemo, useState} from 'react';
import {
  INITIAL_MEMORY_METRICS,
  applyCreateLeak,
  applyRelease,
  buildSparkline,
  type LeakKind,
} from '../experiments/javascript/memoryRetention';

export function useMemoryRetention() {
  const [metrics, setMetrics] = useState(INITIAL_MEMORY_METRICS);
  const [leakKind, setLeakKind] = useState<LeakKind>('listener');

  const spark = useMemo(
    () => buildSparkline(metrics.retained),
    [metrics.retained],
  );

  const reset = useCallback(() => {
    setMetrics(INITIAL_MEMORY_METRICS);
    setLeakKind('listener');
  }, []);

  const createLeak = useCallback(() => {
    setMetrics(prev => applyCreateLeak(prev, leakKind));
  }, [leakKind]);

  const release = useCallback(() => {
    setMetrics(applyRelease);
  }, []);

  return {
    closures: metrics.closures,
    retained: metrics.retained,
    objects: metrics.objects,
    heapMb: metrics.heapMb,
    leakKind,
    setLeakKind,
    spark,
    reset,
    createLeak,
    release,
  };
}
