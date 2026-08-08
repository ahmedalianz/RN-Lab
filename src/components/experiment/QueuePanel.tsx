import {StyleSheet, View} from 'react-native';
import {Text} from '../Text';
import {colors, radii, spacing} from '../../theme';

type Props = {
  title: string;
  accent: string;
  items: string[];
  emptyLabel?: string;
};

export function QueuePanel({
  title,
  accent,
  items,
  emptyLabel = '(empty)',
}: Props) {
  return (
    <View style={[styles.panel, {borderColor: accent}]}>
      <Text variant="labelCaps" color={accent}>
        {title}
      </Text>
      {items.length === 0 ? (
        <Text variant="codeSm" color={colors.outline}>
          {emptyLabel}
        </Text>
      ) : (
        items.map((item, index) => (
          <Text key={`${item}-${index}`} variant="codeSm" color={accent}>
            {item}
          </Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    backgroundColor: colors.surfaceContainer,
    gap: 4,
    minHeight: 64,
  },
});
