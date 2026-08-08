import {useCallback, useMemo, useState} from 'react';
import {
  INITIAL_CLOSURE_METRICS,
  applyCreateLeak,
  applyRelease,
  applyRun,
  applyStep,
  buildSparkline,
  type LeakKind,
} from '../experiments/javascript/closureMemory';

export function useClosureMemory() {
  const [metrics, setMetrics] = useState(INITIAL_CLOSURE_METRICS);
  const [leakKind, setLeakKind] = useState<LeakKind>('listener');

  const spark = useMemo(
    () => buildSparkline(metrics.retained),
    [metrics.retained],
  );

  const run = useCallback(() => {
    setMetrics(applyRun);
  }, []);

  const step = useCallback(() => {
    setMetrics(applyStep);
  }, []);

  const reset = useCallback(() => {
    setMetrics(INITIAL_CLOSURE_METRICS);
  }, []);

  const createLeak = useCallback(() => {
    setMetrics(prev => applyCreateLeak(prev, leakKind));
  }, [leakKind]);

  const release = useCallback(() => {
    setMetrics(applyRelease);
  }, []);

  return {
    count: metrics.count,
    closures: metrics.closures,
    retained: metrics.retained,
    objects: metrics.objects,
    heapMb: metrics.heapMb,
    stepHighlight: metrics.stepHighlight,
    leakKind,
    setLeakKind,
    spark,
    run,
    step,
    reset,
    createLeak,
    release,
  };
}
