import {colors} from '../../theme';

export type HermesLogLine = {
  time: string;
  level: string;
  message: string;
};

export type HermesMetrics = {
  heapMb: number;
  executionMs: number | null;
  gcMs: number;
  bytecodeMb: number;
};

export type HermesHighlight =
  | 'js'
  | 'parser'
  | 'bytecode'
  | 'runtime'
  | 'memory'
  | 'rn'
  | null;

export type HermesPhase =
  | 'idle'
  | 'compile'
  | 'allocate'
  | 'execute'
  | 'gc'
  | 'done';

export type HermesPhaseStep = {
  phase: HermesPhase;
  delayMs: number;
  highlight: HermesHighlight;
  level: string;
  message: (itemCount: number) => string;
  metrics: (itemCount: number) => HermesMetrics;
};

export const HERMES_ACCENT = {
  active: colors.primaryFixedDim,
  heap: colors.secondary,
  gc: colors.tertiaryContainer,
  bytecode: colors.primaryFixedDim,
} as const;

export const ITEM_PRESETS = [100, 500, 1000, 5000, 10000] as const;
export const DEFAULT_ITEM_COUNT = 1000;
export const ITEM_MIN = 100;
export const ITEM_MAX = 10000;
export const ITEM_STEP = 100;

/** Base engine footprint before any benchmark load. */
const BASE_HEAP_MB = 128;
const BASE_BYTECODE_MB = 2.8;
const BASE_GC_MS = 8;

export const INITIAL_LOGS: HermesLogLine[] = [
  {time: '14:02:01', level: 'INFO', message: 'Hermes engine initialized.'},
  {
    time: '14:02:02',
    level: 'INFO',
    message: 'Bytecode loaded successfully (2.8MB).',
  },
  {time: '14:02:05', level: 'WARN', message: 'Minor GC triggered (8ms).'},
  {time: '14:02:10', level: 'INFO', message: 'Benchmark suite ready.'},
];

export const IDLE_METRICS: HermesMetrics = {
  heapMb: BASE_HEAP_MB,
  executionMs: null,
  gcMs: BASE_GC_MS,
  bytecodeMb: BASE_BYTECODE_MB,
};

export function clampItemCount(value: number): number {
  const stepped = Math.round(value / ITEM_STEP) * ITEM_STEP;
  return Math.min(ITEM_MAX, Math.max(ITEM_MIN, stepped));
}

export function formatMetrics(metrics: HermesMetrics): {
  heap: string;
  execution: string;
  gc: string;
  bytecode: string;
} {
  return {
    heap: `${metrics.heapMb.toFixed(1)} MB`,
    execution:
      metrics.executionMs === null ? '—' : `${metrics.executionMs.toFixed(1)} ms`,
    gc: `${metrics.gcMs.toFixed(0)} ms`,
    bytecode: `${metrics.bytecodeMb.toFixed(1)} MB`,
  };
}

/**
 * Scales Hermes cost model with workload size.
 * itemCount is the array length used by the Array Ops benchmark.
 */
export function metricsForPhase(
  itemCount: number,
  phase: HermesPhase,
): HermesMetrics {
  const load = itemCount / DEFAULT_ITEM_COUNT;
  const bytecodeMb = BASE_BYTECODE_MB + load * 0.35;
  const heapAllocated = BASE_HEAP_MB + load * 6.5;
  const executionMs = 1.2 + load * 3.0 + Math.log10(itemCount) * 0.4;
  const gcMs = BASE_GC_MS + load * 7.5;

  switch (phase) {
    case 'idle':
      return IDLE_METRICS;
    case 'compile':
      return {
        heapMb: BASE_HEAP_MB + load * 0.4,
        executionMs: null,
        gcMs: BASE_GC_MS,
        bytecodeMb: Number(bytecodeMb.toFixed(2)),
      };
    case 'allocate':
      return {
        heapMb: Number((BASE_HEAP_MB + load * 3.2).toFixed(1)),
        executionMs: null,
        gcMs: BASE_GC_MS,
        bytecodeMb: Number(bytecodeMb.toFixed(2)),
      };
    case 'execute':
      return {
        heapMb: Number(heapAllocated.toFixed(1)),
        executionMs: Number(executionMs.toFixed(1)),
        gcMs: BASE_GC_MS,
        bytecodeMb: Number(bytecodeMb.toFixed(2)),
      };
    case 'gc':
    case 'done':
      return {
        heapMb: Number((heapAllocated - load * 1.1).toFixed(1)),
        executionMs: Number(executionMs.toFixed(1)),
        gcMs: Number(gcMs.toFixed(0)),
        bytecodeMb: Number(bytecodeMb.toFixed(2)),
      };
  }
}

export const PHASE_STEPS: HermesPhaseStep[] = [
  {
    phase: 'compile',
    delayMs: 0,
    highlight: 'parser',
    level: 'INFO',
    message: n => `Compiling Array Ops suite [${n}] → bytecode…`,
    metrics: n => metricsForPhase(n, 'compile'),
  },
  {
    phase: 'compile',
    delayMs: 320,
    highlight: 'bytecode',
    level: 'INFO',
    message: n =>
      `Bytecode ready (${metricsForPhase(n, 'compile').bytecodeMb.toFixed(1)}MB).`,
    metrics: n => metricsForPhase(n, 'compile'),
  },
  {
    phase: 'allocate',
    delayMs: 280,
    highlight: 'memory',
    level: 'INFO',
    message: n => `Allocating heap buffers for ${n} items…`,
    metrics: n => metricsForPhase(n, 'allocate'),
  },
  {
    phase: 'execute',
    delayMs: 300,
    highlight: 'runtime',
    level: 'INFO',
    message: n => `Executing Array Ops [${n}] on Hermes…`,
    metrics: n => metricsForPhase(n, 'execute'),
  },
  {
    phase: 'gc',
    delayMs: 340,
    highlight: 'memory',
    level: 'WARN',
    message: n =>
      `Minor GC triggered (${metricsForPhase(n, 'gc').gcMs.toFixed(0)}ms).`,
    metrics: n => metricsForPhase(n, 'gc'),
  },
  {
    phase: 'done',
    delayMs: 260,
    highlight: 'rn',
    level: 'SUCCESS',
    message: n =>
      `DONE Array Ops [${n}] in ${metricsForPhase(n, 'done').executionMs?.toFixed(1)}ms.`,
    metrics: n => metricsForPhase(n, 'done'),
  },
];

export function stampTime(): string {
  return new Date().toTimeString().slice(0, 8);
}
