import {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Circle, Path, Text as SvgText} from 'react-native-svg';
import {Text} from '../../../../components/Text';
import {
  MEMO_ACCENT,
  type MemoMetrics,
  type MemoTrendPoint,
} from '../../../../experiments/javascript/reactMemoization';
import {colors, radii, spacing} from '../../../../theme';

const CHART_WIDTH = 320;
const CHART_HEIGHT = 120;
const PAD_LEFT = 28;
const PAD_RIGHT = 12;
const PAD_TOP = 12;
const PAD_BOTTOM = 22;

type ChartPoint = {x: number; y: number};

function buildSmoothPath(points: ChartPoint[]): string {
  if (points.length === 0) {
    return '';
  }
  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = points[index === 0 ? 0 : index - 1];
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = points[index + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return path;
}

function toSeries(
  trend: MemoTrendPoint[],
  key: keyof MemoTrendPoint,
  maxValue: number,
): ChartPoint[] {
  const plotWidth = CHART_WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = CHART_HEIGHT - PAD_TOP - PAD_BOTTOM;
  const lastIndex = Math.max(trend.length - 1, 1);

  return trend.map((point, index) => {
    const ratio = maxValue === 0 ? 0 : point[key] / maxValue;
    return {
      x: PAD_LEFT + (index / lastIndex) * plotWidth,
      y: PAD_TOP + plotHeight * (1 - ratio),
    };
  });
}

export function MemoTrendChart({trend}: {trend: MemoTrendPoint[]}) {
  const {parentPath, childPath, parentPoints, childPoints, maxValue} =
    useMemo(() => {
      const peak = Math.max(
        1,
        ...trend.map(point => Math.max(point.parent, point.childWithMemo)),
      );
      const parents = toSeries(trend, 'parent', peak);
      const children = toSeries(trend, 'childWithMemo', peak);
      return {
        maxValue: peak,
        parentPoints: parents,
        childPoints: children,
        parentPath: buildSmoothPath(parents),
        childPath: buildSmoothPath(children),
      };
    }, [trend]);

  const midValue = Math.round(maxValue / 2);

  return (
    <View style={styles.trendCard}>
      <View style={styles.trendHeader}>
        <View style={styles.legendRow}>
          <LegendDot color={MEMO_ACCENT.time} label="Parent" />
          <LegendDot color={MEMO_ACCENT.primary} label="Child (memo)" />
        </View>
      </View>

      <Svg
        width="100%"
        height={CHART_HEIGHT}
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}>
        <SvgText
          x={4}
          y={PAD_TOP + 4}
          fill={colors.outline}
          fontSize={9}
          fontFamily="monospace">
          {String(maxValue)}
        </SvgText>
        <SvgText
          x={4}
          y={CHART_HEIGHT / 2}
          fill={colors.outline}
          fontSize={9}
          fontFamily="monospace">
          {String(midValue)}
        </SvgText>
        <SvgText
          x={4}
          y={CHART_HEIGHT - PAD_BOTTOM}
          fill={colors.outline}
          fontSize={9}
          fontFamily="monospace">
          0
        </SvgText>

        <Path
          d={parentPath}
          stroke={MEMO_ACCENT.time}
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={childPath}
          stroke={MEMO_ACCENT.primary}
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {parentPoints.map((point, index) => (
          <Circle
            key={`parent-dot-${index}`}
            cx={point.x}
            cy={point.y}
            r={3}
            fill={MEMO_ACCENT.time}
          />
        ))}
        {childPoints.map((point, index) => (
          <Circle
            key={`child-dot-${index}`}
            cx={point.x}
            cy={point.y}
            r={3}
            fill={MEMO_ACCENT.primary}
          />
        ))}
      </Svg>

      <Text variant="codeSm" color={colors.outline}>
        Cumulative parent vs memoized-child renders. Gap widens when memo
        skips.
      </Text>
    </View>
  );
}

function LegendDot({color, label}: {color: string; label: string}) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendSwatch, {backgroundColor: color}]} />
      <Text variant="codeSm" color={colors.outline}>
        {label}
      </Text>
    </View>
  );
}

export function MemoComparison({metrics}: {metrics: MemoMetrics}) {
  return (
    <View style={styles.compareRoot}>
      <TreeColumn
        title="WITHOUT MEMO"
        parentRenders={metrics.parentRenders}
        childRenders={metrics.childWithoutMemo}
        childAccent={MEMO_ACCENT.time}
      />
      <TreeColumn
        title="WITH MEMO"
        parentRenders={metrics.parentRenders}
        childRenders={metrics.childWithMemo}
        childAccent={MEMO_ACCENT.primary}
      />
    </View>
  );
}

function TreeColumn({
  title,
  parentRenders,
  childRenders,
  childAccent,
}: {
  title: string;
  parentRenders: number;
  childRenders: number;
  childAccent: string;
}) {
  return (
    <View style={styles.column}>
      <Text variant="labelCaps" color={colors.outline}>
        {title}
      </Text>
      <View style={styles.node}>
        <Text variant="codeMd">Parent</Text>
        <Text variant="codeSm" color={colors.outline}>
          Render: {parentRenders}
        </Text>
      </View>
      <View style={styles.connector} />
      <View style={[styles.node, {borderColor: childAccent}]}>
        <Text variant="codeMd" color={childAccent}>
          Child
        </Text>
        <Text variant="codeSm" color={colors.outline}>
          Render: {childRenders}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  trendCard: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    gap: spacing.xs,
  },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  legendRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendSwatch: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  compareRoot: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  column: {
    flex: 1,
    gap: spacing.xs,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
  },
  node: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radii.default,
    padding: spacing.xs,
    gap: 2,
    backgroundColor: colors.surfaceContainerHigh,
  },
  connector: {
    width: 1,
    height: 12,
    alignSelf: 'center',
    backgroundColor: colors.outlineVariant,
  },
});
