import {StyleSheet, View} from 'react-native';
import {Text} from '../Text';
import {colors, radii, spacing} from '../../theme';

const DOT_RED = '#ff5f57';
const DOT_YELLOW = '#febc2e';
const DOT_GREEN = '#28c840';

export type TerminalLine = {
  time?: string;
  level?: string;
  message: string;
  color?: string;
};

type Props = {
  title?: string;
  lines: TerminalLine[];
  showCursor?: boolean;
};

export function ColoredTerminal({
  title = 'TERMINAL',
  lines,
  showCursor = true,
}: Props) {
  return (
    <View style={styles.terminal}>
      <View style={styles.header}>
        <Text variant="labelCaps" color={colors.outline}>
          {title}
        </Text>
        <View style={styles.windowDots}>
          <View style={[styles.dot, {backgroundColor: DOT_RED}]} />
          <View style={[styles.dot, {backgroundColor: DOT_YELLOW}]} />
          <View style={[styles.dot, {backgroundColor: DOT_GREEN}]} />
        </View>
      </View>
      <View style={styles.body}>
        {lines.map((line, index) => (
          <Text key={`${line.message}-${index}`} variant="codeSm">
            {line.time ? (
              <Text variant="codeSm" color={colors.outline}>
                [{line.time}]{' '}
              </Text>
            ) : null}
            {line.level ? (
              <Text
                variant="codeSm"
                color={line.color ?? colors.onSurfaceVariant}>
                {line.level}{' '}
              </Text>
            ) : null}
            <Text
              variant="codeSm"
              color={line.color ?? colors.onSurfaceVariant}>
              {line.message}
            </Text>
          </Text>
        ))}
        {showCursor ? (
          <Text variant="codeSm" color={colors.onSurface}>
            {'> _'}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  terminal: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surfaceContainer,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  windowDots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  body: {
    backgroundColor: colors.terminal,
    padding: spacing.containerPadding,
    gap: 6,
    minHeight: 120,
  },
});
