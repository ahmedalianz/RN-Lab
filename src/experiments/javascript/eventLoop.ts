import {colors} from '../../theme';

export type EventLoopLogLine = {
  tag: string;
  message: string;
  color: string;
};

export type EventLoopState = {
  callStack: string[];
  microtasks: string[];
  macrotasks: string[];
  logs: EventLoopLogLine[];
};

export const INITIAL_STATE: EventLoopState = {
  callStack: ['main()'],
  microtasks: ['Promise.then'],
  macrotasks: ['setTimeout', 'event listener'],
  logs: [
    {tag: '[SYS]', message: 'Visualizer ready', color: colors.onSurface},
    {
      tag: '[SCRIPT]',
      message: 'main() running — queues primed',
      color: colors.onSurfaceVariant,
    },
  ],
};

const pushLog = (
  prev: EventLoopState,
  tag: string,
  message: string,
  color: string,
): EventLoopLogLine[] => [...prev.logs.slice(-10), {tag, message, color}];

/** Advance one step: call stack → microtasks → macrotasks. */
export function advanceEventLoop(state: EventLoopState): EventLoopState {
  if (state.callStack.length > 0) {
    const frame = state.callStack[state.callStack.length - 1];
    const callStack = state.callStack.slice(0, -1);
    return {
      ...state,
      callStack,
      logs: pushLog(
        state,
        '[EXEC]',
        `Removed ${frame} from call stack`,
        colors.tertiaryContainer,
      ),
    };
  }

  if (state.microtasks.length > 0) {
    const [task, ...microtasks] = state.microtasks;
    return {
      ...state,
      microtasks,
      callStack: [task],
      logs: pushLog(
        state,
        '[M-Q]',
        `Dequeued ${task} → call stack`,
        colors.secondary,
      ),
    };
  }

  if (state.macrotasks.length > 0) {
    const [task, ...macrotasks] = state.macrotasks;
    return {
      ...state,
      macrotasks,
      callStack: [task],
      logs: pushLog(
        state,
        '[MACRO]',
        `Dequeued ${task} → call stack`,
        colors.primaryFixedDim,
      ),
    };
  }

  return {
    ...state,
    logs: pushLog(
      state,
      '[LOOP]',
      'Event loop idle — nothing to process',
      colors.outline,
    ),
  };
}

export function isEventLoopIdle(state: EventLoopState): boolean {
  return (
    state.callStack.length === 0 &&
    state.microtasks.length === 0 &&
    state.macrotasks.length === 0
  );
}
