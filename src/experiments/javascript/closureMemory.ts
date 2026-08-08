import {colors} from '../../theme';

export type LeakKind = 'listener' | 'timer' | 'subscription' | 'large';

export type ClosureMetrics = {
  count: number;
  closures: number;
  retained: number;
  objects: number;
  heapMb: number;
  stepHighlight: number;
};

export type CodeLine = {
  text: string;
  color: string;
};

export const CODE_LINES: CodeLine[] = [
  {text: 'function createCounter() {', color: colors.onSurfaceVariant},
  {text: '  let count = 0;', color: colors.onSurfaceVariant},
  {text: '  return function() {', color: colors.onSurfaceVariant},
  {text: '    count += 1;', color: colors.onSurfaceVariant},
  {text: '    return count;', color: colors.onSurfaceVariant},
  {text: '  };', color: colors.onSurfaceVariant},
  {text: '}', color: colors.onSurfaceVariant},
  {text: '', color: colors.onSurfaceVariant},
  {text: 'const counter = createCounter();', color: colors.onSurfaceVariant},
  {
    text: 'console.log(counter()); // Breakpoint',
    color: colors.primaryFixedDim,
  },
];

export const LEAK_OPTIONS: Array<{id: LeakKind; label: string}> = [
  {id: 'listener', label: 'Event Listener'},
  {id: 'timer', label: 'Timer (setInterval)'},
  {id: 'subscription', label: 'Subscription'},
  {id: 'large', label: 'Large Object'},
];

export const INITIAL_CLOSURE_METRICS: ClosureMetrics = {
  count: 2,
  closures: 4,
  retained: 2,
  objects: 1284,
  heapMb: 12.4,
  stepHighlight: 9,
};

const SPARK_BASE = [8, 10, 9, 12, 14, 13, 16, 18];

export function buildSparkline(retained: number): number[] {
  return SPARK_BASE.map((value, index) => value + retained * 2 + index);
}

export function applyRun(metrics: ClosureMetrics): ClosureMetrics {
  return {...metrics, count: 1, stepHighlight: 9};
}

export function applyStep(metrics: ClosureMetrics): ClosureMetrics {
  return {
    ...metrics,
    count: metrics.count + 1,
    stepHighlight: 4,
  };
}

export function applyCreateLeak(
  metrics: ClosureMetrics,
  leakKind: LeakKind,
): ClosureMetrics {
  const large = leakKind === 'large';
  return {
    ...metrics,
    closures: metrics.closures + 1,
    retained: metrics.retained + 1,
    objects: metrics.objects + (large ? 120 : 36),
    heapMb: Number((metrics.heapMb + (large ? 1.8 : 0.4)).toFixed(1)),
  };
}

export function applyRelease(metrics: ClosureMetrics): ClosureMetrics {
  return {
    ...metrics,
    retained: Math.max(0, metrics.retained - 1),
    closures: Math.max(1, metrics.closures - 1),
    objects: Math.max(800, metrics.objects - 24),
    heapMb: Number(Math.max(8, metrics.heapMb - 0.3).toFixed(1)),
  };
}
