import {colors} from '../../theme';

export type HermesLogLine = {
  time: string;
  level: string;
  message: string;
};

export type HermesMetrics = {
  heap: string;
  execution: string;
  gc: string;
  bytecode: string;
};

export type HermesHighlight = 'runtime' | 'rn' | null;

export const HERMES_ACCENT = {
  active: colors.primaryFixedDim,
  heap: colors.secondary,
  gc: colors.tertiaryContainer,
  bytecode: colors.primaryFixedDim,
} as const;

export const INITIAL_LOGS: HermesLogLine[] = [
  {time: '14:02:01', level: 'INFO', message: 'Hermes engine initialized.'},
  {
    time: '14:02:02',
    level: 'INFO',
    message: 'Bytecode loaded successfully (2.8MB).',
  },
  {time: '14:02:05', level: 'WARN', message: 'Minor GC triggered (12ms).'},
  {time: '14:02:10', level: 'INFO', message: 'Benchmark suite ready.'},
];

export const IDLE_METRICS: HermesMetrics = {
  heap: '128 MB',
  execution: '—',
  gc: '12 ms',
  bytecode: '2.8 MB',
};

export const BENCHMARK_RESULT_METRICS: HermesMetrics = {
  heap: '131 MB',
  execution: '4.2 ms',
  gc: '12 ms',
  bytecode: '2.8 MB',
};

export const BENCHMARK_DELAY_MS = 450;

export function stampTime(): string {
  return new Date().toTimeString().slice(0, 8);
}
