import {colors} from '../../theme';

export type MemoTechnique = 'memo' | 'useMemo' | 'useCallback';

export type MemoAction = 'updateParent' | 'changeProps';

export type MemoTrendPoint = {
  parent: number;
  childWithMemo: number;
};

export type MemoMetrics = {
  totalRenders: number;
  skippedRenders: number;
  parentRenders: number;
  childWithoutMemo: number;
  childWithMemo: number;
  trend: MemoTrendPoint[];
};

export type MemoLogLine = {
  time: string;
  level: string;
  message: string;
};

export const MEMO_TECHNIQUES: Array<{id: MemoTechnique; label: string}> = [
  {id: 'memo', label: 'React.memo'},
  {id: 'useMemo', label: 'useMemo'},
  {id: 'useCallback', label: 'useCallback'},
];

export const MEMO_ACCENT = {
  primary: colors.primaryFixedDim,
  skipped: colors.secondary,
  time: colors.error,
  tree: colors.outlineVariant,
} as const;

export const MEMO_TREND_WINDOW = 10;

export const MEMO_CODE: Record<MemoTechnique, string> = {
  memo: `import { memo } from 'react';

const ExpensiveChild = memo(function ExpensiveChild({ value }) {
  return <Text>{value}</Text>;
});

function Parent({ tick }) {
  // stable primitive prop → child skips
  return <ExpensiveChild value={tick} />;
}`,
  useMemo: `function Parent({ tick, filter }) {
  const items = useMemo(
    () => heavyFilter(filter),
    [filter],
  );
  return <ExpensiveChild items={items} tick={tick} />;
}`,
  useCallback: `function Parent({ tick }) {
  const onPress = useCallback(() => {
    console.log(tick);
  }, [tick]);
  return <ExpensiveChild onPress={onPress} />;
}`,
};

export const INITIAL_MEMO_METRICS: MemoMetrics = {
  totalRenders: 0,
  skippedRenders: 0,
  parentRenders: 0,
  childWithoutMemo: 0,
  childWithMemo: 0,
  trend: [{parent: 0, childWithMemo: 0}],
};

function pushTrend(
  trend: MemoTrendPoint[],
  point: MemoTrendPoint,
): MemoTrendPoint[] {
  return [...trend, point].slice(-MEMO_TREND_WINDOW);
}

function stampTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes(),
  ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}

export function describeMemoAction(
  technique: MemoTechnique,
  action: MemoAction,
): string {
  if (action === 'updateParent') {
    if (technique === 'memo') {
      return 'Parent state change → React.memo skipped child (same props)';
    }
    if (technique === 'useMemo') {
      return 'Parent tick change → useMemo kept items identity';
    }
    return 'Parent tick change → useCallback kept handler identity';
  }

  if (technique === 'memo') {
    return 'Props changed → React.memo allowed child render';
  }
  if (technique === 'useMemo') {
    return 'filter changed → useMemo recomputed expensive value';
  }
  return 'Dependency changed → useCallback created new function';
}

export function applyMemoAction(
  metrics: MemoMetrics,
  technique: MemoTechnique,
  action: MemoAction,
): {metrics: MemoMetrics; log: MemoLogLine} {
  const childWithout = 1;
  let childWith = 1;
  let skipped = 0;

  if (action === 'updateParent') {
    // Memoized child keeps the same prop identity → skip
    childWith = 0;
    skipped = 1;
  } else {
    // Real prop/dep change → memo cannot skip
    childWith = 1;
    skipped = 0;
  }

  const parentRenders = metrics.parentRenders + 1;
  const childWithoutMemo = metrics.childWithoutMemo + childWithout;
  const childWithMemo = metrics.childWithMemo + childWith;
  const rendersThisTurn = 1 + childWithout + childWith;

  const next: MemoMetrics = {
    totalRenders: metrics.totalRenders + rendersThisTurn,
    skippedRenders: metrics.skippedRenders + skipped,
    parentRenders,
    childWithoutMemo,
    childWithMemo,
    trend: pushTrend(metrics.trend, {parent: parentRenders, childWithMemo}),
  };

  return {
    metrics: next,
    log: {
      time: stampTime(),
      level: skipped > 0 ? 'SKIP' : 'RENDER',
      message: describeMemoAction(technique, action),
    },
  };
}
