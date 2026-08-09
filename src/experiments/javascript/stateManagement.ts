import {colors} from '../../theme';

export type StateStrategy =
  | 'useState'
  | 'useReducer'
  | 'context'
  | 'externalStore';

export type StateActionType =
  | 'INCREMENT_COUNT'
  | 'SET_STATUS'
  | 'RENAME_USER';

export type StateNodeId =
  | 'app'
  | 'header'
  | 'avatar'
  | 'counter'
  | 'footer';

export type StateTreeNode = {
  id: StateNodeId;
  label: string;
  depth: number;
  parentId: StateNodeId | null;
};

export type AppState = {
  user: {id: number; name: string};
  metrics: {count: number; status: string};
};

export type StateMetrics = {
  notified: number;
  reRendered: number;
  updateMs: number;
  sparkNotified: number[];
  sparkRendered: number[];
  sparkTime: number[];
};

export type StateLogLine = {
  time: string;
  level: string;
  message: string;
  detail?: string;
  color?: string;
};

export const STATE_STRATEGIES: Array<{id: StateStrategy; label: string}> = [
  {id: 'useState', label: 'useState'},
  {id: 'useReducer', label: 'useReducer'},
  {id: 'context', label: 'Context'},
  {id: 'externalStore', label: 'External Store'},
];

export const STATE_ACTIONS: Array<{id: StateActionType; label: string}> = [
  {id: 'INCREMENT_COUNT', label: 'INCREMENT_COUNT'},
  {id: 'SET_STATUS', label: 'SET_STATUS'},
  {id: 'RENAME_USER', label: 'RENAME_USER'},
];

export const STATE_TREE: StateTreeNode[] = [
  {id: 'app', label: '<App />', depth: 0, parentId: null},
  {id: 'header', label: '<Header />', depth: 1, parentId: 'app'},
  {id: 'avatar', label: '<UserAvatar />', depth: 2, parentId: 'header'},
  {id: 'counter', label: '<CounterView />', depth: 1, parentId: 'app'},
  {id: 'footer', label: '<Footer />', depth: 1, parentId: 'app'},
];

export const STATE_ACCENT = {
  primary: colors.primaryFixedDim,
  render: colors.secondary,
  time: colors.tertiaryContainer,
  mutable: colors.tertiaryContainer,
} as const;

export const INITIAL_APP_STATE: AppState = {
  user: {id: 849, name: 'Ahmed'},
  metrics: {count: 41, status: 'idle'},
};

export const INITIAL_STATE_METRICS: StateMetrics = {
  notified: 0,
  reRendered: 0,
  updateMs: 0,
  sparkNotified: [1, 1, 2, 1, 1, 2, 1, 1],
  sparkRendered: [1, 0, 1, 1, 0, 1, 0, 1],
  sparkTime: [1, 1.2, 0.9, 1.4, 1.1, 1.3, 1.0, 1.2],
};

export const DEFAULT_PAYLOADS: Record<StateActionType, string> = {
  INCREMENT_COUNT: '{\n  "amount": 1\n}',
  SET_STATUS: '{\n  "status": "active"\n}',
  RENAME_USER: '{\n  "name": "Ahmed"\n}',
};

export function mutabilityLabel(strategy: StateStrategy): string {
  if (strategy === 'externalStore') {
    return 'EXTERNAL';
  }
  if (strategy === 'context') {
    return 'SHARED';
  }
  return 'LOCAL';
}

export function formatStateStore(state: AppState): string {
  return `const state = {
  "user": {
    "id": ${state.user.id},
    "name": '${state.user.name}'
  },
  "metrics": {
    "count": ${state.metrics.count},
    "status": '${state.metrics.status}'
  }
};`;
}

function stampTime(): string {
  const now = new Date();
  const ms = String(now.getMilliseconds()).padStart(3, '0');
  return `${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes(),
  ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${ms}`;
}

function pushSpark(spark: number[], value: number): number[] {
  return [...spark.slice(1), value];
}

function subscribersFor(
  strategy: StateStrategy,
  action: StateActionType,
): StateNodeId[] {
  if (strategy === 'context') {
    if (action === 'RENAME_USER') {
      return ['app', 'header', 'avatar', 'counter', 'footer'];
    }
    return ['app', 'counter', 'footer'];
  }

  if (strategy === 'externalStore') {
    if (action === 'RENAME_USER') {
      return ['avatar'];
    }
    return ['counter'];
  }

  // useState / useReducer — local ownership
  if (action === 'RENAME_USER') {
    return ['header', 'avatar'];
  }
  return ['counter'];
}

export type ParsedPayload =
  | {ok: true; amount?: number; status?: string; name?: string}
  | {ok: false; error: string};

export function parsePayload(
  action: StateActionType,
  raw: string,
): ParsedPayload {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) {
      return {ok: false, error: 'Payload must be a JSON object'};
    }
    const record = parsed as Record<string, unknown>;

    if (action === 'INCREMENT_COUNT') {
      const amount = record.amount;
      if (typeof amount !== 'number' || !Number.isFinite(amount)) {
        return {ok: false, error: '"amount" must be a number'};
      }
      return {ok: true, amount};
    }

    if (action === 'SET_STATUS') {
      const status = record.status;
      if (typeof status !== 'string' || status.length === 0) {
        return {ok: false, error: '"status" must be a non-empty string'};
      }
      return {ok: true, status};
    }

    const name = record.name;
    if (typeof name !== 'string' || name.length === 0) {
      return {ok: false, error: '"name" must be a non-empty string'};
    }
    return {ok: true, name};
  } catch {
    return {ok: false, error: 'Invalid JSON payload'};
  }
}

export type DispatchResult = {
  state: AppState;
  metrics: StateMetrics;
  logs: StateLogLine[];
  highlighted: StateNodeId[];
};

export function applyDispatch(
  state: AppState,
  metrics: StateMetrics,
  logs: StateLogLine[],
  strategy: StateStrategy,
  action: StateActionType,
  payload: ParsedPayload & {ok: true},
): DispatchResult {
  const next: AppState = {
    user: {...state.user},
    metrics: {...state.metrics},
  };

  let detail = '';
  if (action === 'INCREMENT_COUNT' && payload.amount !== undefined) {
    const prev = next.metrics.count;
    next.metrics.count = prev + payload.amount;
    detail = `metrics.count: ${prev} → ${next.metrics.count}`;
  } else if (action === 'SET_STATUS' && payload.status !== undefined) {
    const prev = next.metrics.status;
    next.metrics.status = payload.status;
    detail = `metrics.status: '${prev}' → '${payload.status}'`;
  } else if (action === 'RENAME_USER' && payload.name !== undefined) {
    const prev = next.user.name;
    next.user.name = payload.name;
    detail = `user.name: '${prev}' → '${payload.name}'`;
  }

  const highlighted = subscribersFor(strategy, action);
  const updateMs = Number((0.8 + highlighted.length * 0.25 + Math.random()).toFixed(1));
  const notified = strategy === 'context' ? highlighted.length : 1;

  const nextMetrics: StateMetrics = {
    notified,
    reRendered: highlighted.length,
    updateMs,
    sparkNotified: pushSpark(metrics.sparkNotified, notified),
    sparkRendered: pushSpark(metrics.sparkRendered, highlighted.length),
    sparkTime: pushSpark(metrics.sparkTime, updateMs),
  };

  const time = stampTime();
  const nextLogs: StateLogLine[] = [
    {
      time,
      level: 'DISPATCH',
      message: `DISPATCH: ${action}`,
      detail,
      color: STATE_ACCENT.primary,
    },
    ...highlighted.map(id => {
      const node = STATE_TREE.find(item => item.id === id);
      return {
        time,
        level: 'RENDER',
        message: `RENDER: ${node?.label ?? id}`,
        color: STATE_ACCENT.render,
      };
    }),
    ...logs,
  ].slice(0, 16);

  return {
    state: next,
    metrics: nextMetrics,
    logs: nextLogs,
    highlighted,
  };
}

export const INITIAL_STATE_LOGS: StateLogLine[] = [
  {
    time: 'boot',
    level: 'INIT',
    message: 'INIT — State initialized',
    color: colors.outline,
  },
];
