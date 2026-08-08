import {StyleSheet, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Panel} from '../../components/Panel';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {getDomain, STATUS_LABEL} from '../../data/catalog';
import {colors, spacing} from '../../theme';
import type {LabsStackParamList} from '../../navigation/types';

type Props = NativeStackScreenProps<LabsStackParamList, 'NativeModuleDetails'>;

export function NativeModuleDetailsScreen({route}: Props) {
  const domain = getDomain('native-modules');
  const mod = domain.items.find(item => item.id === route.params.moduleId);

  if (!mod) {
    return (
      <Screen>
        <Text variant="headlineSm">Module not found</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text variant="labelCaps" color={domain.accent}>
        Native Module Details
      </Text>
      <Text variant="headlineSm">{mod.title}</Text>
      <Text variant="bodyMd" color={colors.onSurfaceVariant}>
        {mod.subtitle}
      </Text>

      <Panel accentColor={domain.accent} style={styles.panel}>
        <View style={styles.row}>
          <Text variant="labelCaps" color={colors.onSurfaceVariant}>
            Status
          </Text>
          <Text variant="labelCaps" color={domain.accent}>
            {STATUS_LABEL[mod.status]}
          </Text>
        </View>
        <Text variant="codeSm" color={colors.outline}>
          moduleId → {mod.id}
        </Text>
        <Text variant="codeSm" color={colors.outline}>
          implementation lives in Catalog → Details (no standalone screen)
        </Text>
      </Panel>

      <Panel style={styles.console}>
        <Text variant="labelCaps" color={colors.outline}>
          Module console
        </Text>
        <Text variant="codeSm" color={colors.onSurfaceVariant}>
          INFO  awaiting native binding
        </Text>
      </Panel>
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  console: {
    backgroundColor: colors.terminal,
    gap: spacing.xs,
  },
});
