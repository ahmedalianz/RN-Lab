import {StyleSheet, View, type ViewProps} from 'react-native';
import {colors, radii, spacing} from '../theme';

type Props = ViewProps & {
  /** Left accent for experiment categorization */
  accentColor?: string;
};

export function Panel({accentColor, style, children, ...rest}: Props) {
  return (
    <View
      style={[
        styles.panel,
        accentColor ? {borderLeftWidth: 4, borderLeftColor: accentColor} : null,
        style,
      ]}
      {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.surfaceContainer,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
  },
});
