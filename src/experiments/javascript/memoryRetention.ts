export type LeakKind = 'listener' | 'timer' | 'subscription' | 'large';

export type MemoryRetentionMetrics = {
  closures: number;
  retained: number;
  objects: number;
  heapMb: number;
};

export const LEAK_OPTIONS: Array<{id: LeakKind; label: string}> = [
  {id: 'listener', label: 'Event Listener'},
  {id: 'timer', label: 'Timer (setInterval)'},
  {id: 'subscription', label: 'Subscription'},
  {id: 'large', label: 'Large Object'},
];

export const INITIAL_MEMORY_METRICS: MemoryRetentionMetrics = {
  closures: 4,
  retained: 2,
  objects: 1284,
  heapMb: 12.4,
};

const SPARK_BASE = [8, 10, 9, 12, 14, 13, 16, 18];

export function buildSparkline(retained: number): number[] {
  return SPARK_BASE.map((value, index) => value + retained * 2 + index);
}

export function applyCreateLeak(
  metrics: MemoryRetentionMetrics,
  leakKind: LeakKind,
): MemoryRetentionMetrics {
  const large = leakKind === 'large';
  return {
    ...metrics,
    closures: metrics.closures + 1,
    retained: metrics.retained + 1,
    objects: metrics.objects + (large ? 120 : 36),
    heapMb: Number((metrics.heapMb + (large ? 1.8 : 0.4)).toFixed(1)),
  };
}

export function applyRelease(
  metrics: MemoryRetentionMetrics,
): MemoryRetentionMetrics {
  return {
    ...metrics,
    retained: Math.max(0, metrics.retained - 1),
    closures: Math.max(1, metrics.closures - 1),
    objects: Math.max(800, metrics.objects - 24),
    heapMb: Number(Math.max(8, metrics.heapMb - 0.3).toFixed(1)),
  };
}
