import {Pressable, StyleSheet, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Panel} from '../../components/Panel';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {getDomain, STATUS_LABEL} from '../../data/catalog';
import {navigateToRoute} from '../../navigation/navigate';
import {colors, spacing} from '../../theme';
import type {ExperimentsStackParamList} from '../../navigation/types';

type Props = NativeStackScreenProps<
  ExperimentsStackParamList,
  'ExperimentDetails'
>;

export function ExperimentDetailsScreen({navigation, route}: Props) {
  const domain = getDomain('react-js');
  const experiment = domain.items.find(
    item => item.id === route.params.experimentId,
  );

  if (!experiment) {
    return (
      <Screen>
        <Text variant="headlineSm">Experiment not found</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text variant="labelCaps" color={domain.accent}>
        Experiment
      </Text>
      <Text variant="headlineSm">{experiment.title}</Text>
      <Text variant="bodyMd" color={colors.onSurfaceVariant}>
        {experiment.subtitle}
      </Text>

      <Panel accentColor={domain.accent} style={styles.panel}>
        <View style={styles.row}>
          <Text variant="labelCaps" color={colors.onSurfaceVariant}>
            Status
          </Text>
          <Text variant="labelCaps" color={domain.accent}>
            {STATUS_LABEL[experiment.status]}
          </Text>
        </View>
        <Text variant="codeSm" color={colors.outline}>
          route → {experiment.route}
        </Text>
      </Panel>

      <Pressable
        style={styles.cta}
        onPress={() => navigateToRoute(navigation, experiment.route)}>
        <Text variant="bodyMd" color={colors.onPrimary}>
          Open workbench
        </Text>
      </Pressable>
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
  cta: {
    backgroundColor: colors.primaryContainer,
    borderRadius: 4,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
