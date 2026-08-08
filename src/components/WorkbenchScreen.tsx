import {StyleSheet, View} from 'react-native';
import {ExperimentHeader} from './experiment';
import {Panel} from './Panel';
import {Text} from './Text';
import {Screen} from './Screen';
import {colors, spacing} from '../theme';
import {STATUS_LABEL, type ExperimentStatus} from '../data/catalog';

type Props = {
  title: string;
  domainLabel: string;
  accentColor: string;
  description: string;
  status?: ExperimentStatus;
  path?: string;
  children?: React.ReactNode;
};

export function WorkbenchScreen({
  title,
  domainLabel,
  accentColor,
  description,
  status = 'not_started',
  path,
  children,
}: Props) {
  return (
    <Screen>
      <ExperimentHeader
        domainLabel={domainLabel}
        title={title}
        description={description}
        domainColor={accentColor}
        statusLabel={STATUS_LABEL[status].toUpperCase()}
        statusColor={accentColor}
      />

      <Panel accentColor={accentColor} style={styles.statusPanel}>
        <View style={styles.statusRow}>
          <Text variant="labelCaps" color={colors.onSurfaceVariant}>
            Status
          </Text>
          <Text variant="labelCaps" color={accentColor}>
            {STATUS_LABEL[status]}
          </Text>
        </View>
        <Text variant="codeSm" color={colors.outline}>
          {path ?? 'implementation pending'}
        </Text>
      </Panel>

      <Panel style={styles.console}>
        <Text variant="labelCaps" color={colors.outline}>
          Workbench console
        </Text>
        <Text variant="codeSm" color={colors.onSurfaceVariant}>
          INFO  scaffold ready — wire the experiment next
        </Text>
      </Panel>

      {children}
    </Screen>
  );
}

const styles = StyleSheet.create({
  statusPanel: {
    gap: spacing.xs,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  console: {
    backgroundColor: colors.terminal,
    gap: spacing.xs,
  },
});
