import {colors} from '../../theme';

export type RenderNodeId = 'app' | 'header' | 'counter' | 'value' | 'action';

export type RenderNode = {
  id: RenderNodeId;
  label: string;
  renders: number;
  lastMs: number;
  depth: number;
  parentId: RenderNodeId | null;
};

export type ReconcileAction =
  | 'incrementState'
  | 'changeProps'
  | 'forceRender'
  | 'reset';

export type ReconcileMetrics = {
  renders: number;
  domUpdates: number;
  nodesVisited: number;
  renderMs: number;
};

export type ReconcileLogLine = {
  time: string;
  level: string;
  message: string;
};

export const RECONCILE_ACCENT = {
  primary: colors.primaryFixedDim,
  render: colors.secondary,
  nodes: colors.tertiaryContainer,
  danger: colors.error,
} as const;

export const INITIAL_RENDER_TREE: RenderNode[] = [
  {id: 'app', label: '<App />', renders: 1, lastMs: 0, depth: 0, parentId: null},
  {
    id: 'header',
    label: '<Header />',
    renders: 1,
    lastMs: 0,
    depth: 1,
    parentId: 'app',
  },
  {
    id: 'counter',
    label: '<Counter />',
    renders: 1,
    lastMs: 0,
    depth: 1,
    parentId: 'app',
  },
  {
    id: 'value',
    label: '<Value />',
    renders: 1,
    lastMs: 0,
    depth: 2,
    parentId: 'counter',
  },
  {
    id: 'action',
    label: '<Action />',
    renders: 1,
    lastMs: 0,
    depth: 2,
    parentId: 'counter',
  },
];

export const INITIAL_RECONCILE_METRICS: ReconcileMetrics = {
  renders: 1,
  domUpdates: 0,
  nodesVisited: 5,
  renderMs: 1.2,
};

export const INITIAL_RECONCILE_LOGS: ReconcileLogLine[] = [
  {
    time: 'boot',
    level: 'INFO',
    message: 'Initial render phase started.',
  },
  {
    time: 'boot',
    level: 'MOUNT',
    message: '<App /> mounted successfully.',
  },
  {
    time: 'boot',
    level: 'DONE',
    message: 'DOM reconciliation complete. Waiting for action…',
  },
];

function stampTime(): string {
  const now = new Date();
  const ms = String(now.getMilliseconds()).padStart(3, '0');
  return `${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes(),
  ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${ms}`;
}

function bumpNodes(
  tree: RenderNode[],
  ids: RenderNodeId[],
  costMs: number,
): RenderNode[] {
  return tree.map(node =>
    ids.includes(node.id)
      ? {
          ...node,
          renders: node.renders + 1,
          lastMs: Number((costMs / ids.length).toFixed(2)),
        }
      : {...node, lastMs: 0},
  );
}

export type ReconcileState = {
  tree: RenderNode[];
  metrics: ReconcileMetrics;
  logs: ReconcileLogLine[];
  activeNodeId: RenderNodeId | null;
};

export const INITIAL_RECONCILE_STATE: ReconcileState = {
  tree: INITIAL_RENDER_TREE,
  metrics: INITIAL_RECONCILE_METRICS,
  logs: INITIAL_RECONCILE_LOGS,
  activeNodeId: null,
};

export function applyReconcileAction(
  state: ReconcileState,
  action: Exclude<ReconcileAction, 'reset'>,
): ReconcileState {
  const time = stampTime();

  if (action === 'incrementState') {
    const cost = 1.1 + Math.random() * 0.8;
    const touched: RenderNodeId[] = ['counter', 'value'];
    return {
      tree: bumpNodes(state.tree, touched, cost),
      metrics: {
        renders: state.metrics.renders + touched.length,
        domUpdates: state.metrics.domUpdates + 1,
        nodesVisited: state.metrics.nodesVisited + 3,
        renderMs: Number(cost.toFixed(1)),
      },
      activeNodeId: 'counter',
      logs: [
        {
          time,
          level: 'INFO',
          message: 'setState on <Counter /> — begin render phase',
        },
        {
          time,
          level: 'DIFF',
          message: 'Visited App → Counter → Value (3 nodes)',
        },
        {
          time,
          level: 'COMMIT',
          message: `Committed text update on <Value /> in ${cost.toFixed(1)}ms`,
        },
        ...state.logs,
      ].slice(0, 12),
    };
  }

  if (action === 'changeProps') {
    const cost = 1.4 + Math.random() * 1.1;
    const touched: RenderNodeId[] = ['header', 'counter', 'action'];
    return {
      tree: bumpNodes(state.tree, touched, cost),
      metrics: {
        renders: state.metrics.renders + touched.length,
        domUpdates: state.metrics.domUpdates + 2,
        nodesVisited: state.metrics.nodesVisited + 4,
        renderMs: Number(cost.toFixed(1)),
      },
      activeNodeId: 'header',
      logs: [
        {
          time,
          level: 'INFO',
          message: 'Props changed on <Header /> and <Action />',
        },
        {
          time,
          level: 'DIFF',
          message: 'Reconciler compared props + sibling slots',
        },
        {
          time,
          level: 'COMMIT',
          message: `Host updates applied in ${cost.toFixed(1)}ms`,
        },
        ...state.logs,
      ].slice(0, 12),
    };
  }

  // forceRender
  const cost = 2.2 + Math.random() * 1.4;
  const touched: RenderNodeId[] = [
    'app',
    'header',
    'counter',
    'value',
    'action',
  ];
  return {
    tree: bumpNodes(state.tree, touched, cost),
    metrics: {
      renders: state.metrics.renders + touched.length,
      domUpdates: state.metrics.domUpdates + 1,
      nodesVisited: state.metrics.nodesVisited + touched.length,
      renderMs: Number(cost.toFixed(1)),
    },
    activeNodeId: 'app',
    logs: [
      {
        time,
        level: 'WARN',
        message: 'forceUpdate — full subtree render scheduled',
      },
      {
        time,
        level: 'DIFF',
        message: 'Visited all 5 fiber nodes',
      },
      {
        time,
        level: 'COMMIT',
        message: `Reconciliation complete in ${cost.toFixed(1)}ms`,
      },
      ...state.logs,
    ].slice(0, 12),
  };
}

export function formatRenderCount(value: number): string {
  return String(value).padStart(2, '0');
}
