import {StyleSheet, View} from 'react-native';
import {Panel} from '../../components/Panel';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {colors, spacing} from '../../theme';

export function SettingsScreen() {
  return (
    <Screen>
      <Text variant="headlineSm">Settings</Text>
      <Text variant="bodyMd" color={colors.onSurfaceVariant}>
        Lab preferences, diagnostics toggles, and environment switches.
      </Text>
      <Panel style={styles.panel}>
        <View style={styles.row}>
          <Text variant="bodyLg">Theme</Text>
          <Text variant="codeSm" color={colors.outline}>
            Technical Precision / dark
          </Text>
        </View>
        <View style={styles.row}>
          <Text variant="bodyLg">New Architecture</Text>
          <Text variant="codeSm" color={colors.primaryContainer}>
            enabled
          </Text>
        </View>
        <View style={styles.row}>
          <Text variant="bodyLg">Hermes</Text>
          <Text variant="codeSm" color={colors.primaryContainer}>
            enabled
          </Text>
        </View>
      </Panel>
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
