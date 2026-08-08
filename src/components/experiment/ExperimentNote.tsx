import type {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../Text';
import {categoryColors, colors, radii, spacing} from '../../theme';

type Props = {
  title: string;
  children: ReactNode;
  accentColor?: string;
};

export function ExperimentNote({
  title,
  children,
  accentColor = categoryColors.javascript,
}: Props) {
  return (
    <View style={styles.note}>
      <Text variant="labelCaps" color={accentColor}>
        {title}
      </Text>
      {typeof children === 'string' ? (
        <Text variant="bodyMd" color={colors.onSurfaceVariant}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    backgroundColor: colors.surfaceContainer,
    gap: 4,
  },
});
