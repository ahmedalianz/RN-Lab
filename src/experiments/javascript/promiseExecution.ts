import {colors} from '../../theme';

export type ScenarioId = 'resolve' | 'all' | 'async';

export type QueueState = {
  callStack: string[];
  microtasks: string[];
  macrotasks: string[];
};

export type StepSnapshot = {
  queues: QueueState;
  order: Array<{label: string; color: string}>;
  logs: Array<{time: string; level: string; message: string; color: string}>;
  tasks: number;
  microCount: number;
  macroCount: number;
  execMs: string;
};

export const TASK_COLORS = {
  sync: colors.primaryFixedDim,
  micro: colors.tertiaryContainer,
  macro: colors.secondary,
} as const;

const {sync: SYNC, micro: MICRO, macro: MACRO} = TASK_COLORS;

export const PROMISE_CODE: Record<ScenarioId, string> = {
  resolve: `console.log('A');
setTimeout(() => {
  console.log('B');
}, 0);
Promise.resolve().then(() => {
  console.log('C');
});
console.log('D');`,
  all: `Promise.all([
  Promise.resolve('X'),
  Promise.resolve('Y'),
]).then((vals) => {
  console.log(vals.join('+'));
});
console.log('start');`,
  async: `async function run() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}
run();
console.log('3');`,
};

export const PROMISE_SCENARIOS: Record<ScenarioId, StepSnapshot[]> = {
  resolve: [
    {
      queues: {
        callStack: ["console.log('A')", '<main>'],
        microtasks: [],
        macrotasks: [],
      },
      order: [{label: 'A', color: SYNC}],
      logs: [{time: '0.00ms', level: 'INFO', message: 'A', color: SYNC}],
      tasks: 1,
      microCount: 0,
      macroCount: 0,
      execMs: '0.00ms',
    },
    {
      queues: {
        callStack: ['setTimeout(...)', '<main>'],
        microtasks: [],
        macrotasks: ["() => log('B')"],
      },
      order: [{label: 'A', color: SYNC}],
      logs: [
        {time: '0.00ms', level: 'INFO', message: 'A', color: SYNC},
        {
          time: '0.04ms',
          level: 'INFO',
          message: 'enqueued macrotask',
          color: MACRO,
        },
      ],
      tasks: 2,
      microCount: 0,
      macroCount: 1,
      execMs: '0.04ms',
    },
    {
      queues: {
        callStack: ['Promise.then', '<main>'],
        microtasks: ["() => log('C')"],
        macrotasks: ["() => log('B')"],
      },
      order: [{label: 'A', color: SYNC}],
      logs: [
        {time: '0.00ms', level: 'INFO', message: 'A', color: SYNC},
        {
          time: '0.04ms',
          level: 'INFO',
          message: 'enqueued macrotask',
          color: MACRO,
        },
        {
          time: '0.08ms',
          level: 'INFO',
          message: 'enqueued microtask',
          color: MICRO,
        },
      ],
      tasks: 3,
      microCount: 1,
      macroCount: 1,
      execMs: '0.08ms',
    },
    {
      queues: {
        callStack: ["console.log('D')", '<main>'],
        microtasks: ["() => log('C')"],
        macrotasks: ["() => log('B')"],
      },
      order: [
        {label: 'A', color: SYNC},
        {label: 'D', color: SYNC},
      ],
      logs: [
        {time: '0.00ms', level: 'INFO', message: 'A', color: SYNC},
        {time: '0.12ms', level: 'INFO', message: 'D', color: SYNC},
      ],
      tasks: 4,
      microCount: 1,
      macroCount: 1,
      execMs: '0.12ms',
    },
    {
      queues: {
        callStack: ["() => log('C')"],
        microtasks: [],
        macrotasks: ["() => log('B')"],
      },
      order: [
        {label: 'A', color: SYNC},
        {label: 'D', color: SYNC},
        {label: 'C', color: MICRO},
      ],
      logs: [
        {time: '0.00ms', level: 'INFO', message: 'A', color: SYNC},
        {time: '0.12ms', level: 'INFO', message: 'D', color: SYNC},
        {time: '0.25ms', level: 'INFO', message: 'C', color: MICRO},
      ],
      tasks: 4,
      microCount: 0,
      macroCount: 1,
      execMs: '0.25ms',
    },
    {
      queues: {
        callStack: ["() => log('B')"],
        microtasks: [],
        macrotasks: [],
      },
      order: [
        {label: 'A', color: SYNC},
        {label: 'D', color: SYNC},
        {label: 'C', color: MICRO},
        {label: 'B', color: MACRO},
      ],
      logs: [
        {time: '0.00ms', level: 'INFO', message: 'A', color: SYNC},
        {time: '0.12ms', level: 'INFO', message: 'D', color: SYNC},
        {time: '0.25ms', level: 'INFO', message: 'C', color: MICRO},
        {time: '0.42ms', level: 'INFO', message: 'B', color: MACRO},
      ],
      tasks: 4,
      microCount: 0,
      macroCount: 0,
      execMs: '0.42ms',
    },
    {
      queues: {callStack: [], microtasks: [], macrotasks: []},
      order: [
        {label: 'A', color: SYNC},
        {label: 'D', color: SYNC},
        {label: 'C', color: MICRO},
        {label: 'B', color: MACRO},
      ],
      logs: [
        {time: '0.00ms', level: 'INFO', message: 'A', color: SYNC},
        {time: '0.12ms', level: 'INFO', message: 'D', color: SYNC},
        {time: '0.25ms', level: 'INFO', message: 'C', color: MICRO},
        {time: '0.42ms', level: 'INFO', message: 'B', color: MACRO},
      ],
      tasks: 4,
      microCount: 0,
      macroCount: 0,
      execMs: '0.42ms',
    },
  ],
  all: [
    {
      queues: {
        callStack: ["console.log('start')", '<main>'],
        microtasks: ['Promise.all.then'],
        macrotasks: [],
      },
      order: [{label: 'start', color: SYNC}],
      logs: [{time: '0.00ms', level: 'INFO', message: 'start', color: SYNC}],
      tasks: 2,
      microCount: 1,
      macroCount: 0,
      execMs: '0.05ms',
    },
    {
      queues: {
        callStack: ['Promise.all.then'],
        microtasks: [],
        macrotasks: [],
      },
      order: [
        {label: 'start', color: SYNC},
        {label: 'X+Y', color: MICRO},
      ],
      logs: [
        {time: '0.00ms', level: 'INFO', message: 'start', color: SYNC},
        {time: '0.18ms', level: 'INFO', message: 'X+Y', color: MICRO},
      ],
      tasks: 2,
      microCount: 0,
      macroCount: 0,
      execMs: '0.18ms',
    },
    {
      queues: {callStack: [], microtasks: [], macrotasks: []},
      order: [
        {label: 'start', color: SYNC},
        {label: 'X+Y', color: MICRO},
      ],
      logs: [
        {time: '0.00ms', level: 'INFO', message: 'start', color: SYNC},
        {time: '0.18ms', level: 'INFO', message: 'X+Y', color: MICRO},
      ],
      tasks: 2,
      microCount: 0,
      macroCount: 0,
      execMs: '0.18ms',
    },
  ],
  async: [
    {
      queues: {
        callStack: ["console.log('1')", 'run()', '<main>'],
        microtasks: [],
        macrotasks: [],
      },
      order: [{label: '1', color: SYNC}],
      logs: [{time: '0.00ms', level: 'INFO', message: '1', color: SYNC}],
      tasks: 1,
      microCount: 0,
      macroCount: 0,
      execMs: '0.02ms',
    },
    {
      queues: {
        callStack: ["console.log('3')", '<main>'],
        microtasks: ['async resume'],
        macrotasks: [],
      },
      order: [
        {label: '1', color: SYNC},
        {label: '3', color: SYNC},
      ],
      logs: [
        {time: '0.00ms', level: 'INFO', message: '1', color: SYNC},
        {time: '0.06ms', level: 'INFO', message: '3', color: SYNC},
      ],
      tasks: 3,
      microCount: 1,
      macroCount: 0,
      execMs: '0.06ms',
    },
    {
      queues: {
        callStack: ["console.log('2')"],
        microtasks: [],
        macrotasks: [],
      },
      order: [
        {label: '1', color: SYNC},
        {label: '3', color: SYNC},
        {label: '2', color: MICRO},
      ],
      logs: [
        {time: '0.00ms', level: 'INFO', message: '1', color: SYNC},
        {time: '0.06ms', level: 'INFO', message: '3', color: SYNC},
        {time: '0.21ms', level: 'INFO', message: '2', color: MICRO},
      ],
      tasks: 3,
      microCount: 0,
      macroCount: 0,
      execMs: '0.21ms',
    },
    {
      queues: {callStack: [], microtasks: [], macrotasks: []},
      order: [
        {label: '1', color: SYNC},
        {label: '3', color: SYNC},
        {label: '2', color: MICRO},
      ],
      logs: [
        {time: '0.00ms', level: 'INFO', message: '1', color: SYNC},
        {time: '0.06ms', level: 'INFO', message: '3', color: SYNC},
        {time: '0.21ms', level: 'INFO', message: '2', color: MICRO},
      ],
      tasks: 3,
      microCount: 0,
      macroCount: 0,
      execMs: '0.21ms',
    },
  ],
};

export const EMPTY_PROMISE_SNAPSHOT: StepSnapshot = {
  queues: {callStack: [], microtasks: [], macrotasks: []},
  order: [],
  logs: [],
  tasks: 0,
  microCount: 0,
  macroCount: 0,
  execMs: '0.00ms',
};
