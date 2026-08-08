import {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AlertTriangle, Lock, Play, Server} from 'lucide-react-native';
import {Icon} from '../../../components/Icon';
import {LabButton, TerminalLog} from '../../../components/LabUI';
import {StatusBadge} from '../../../components/StatusBadge';
import {Text} from '../../../components/Text';
import {colors, radii, spacing} from '../../../theme';

const TABS = ['DEMO', 'EXPLANATION', 'ARCHITECTURE', 'NATIVE', 'BENCH'] as const;

export function SslCertificatePinningScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<(typeof TABS)[number]>('DEMO');
  const [logs, setLogs] = useState([
    {
      time: '10:45:01.012',
      level: 'INFO',
      message: 'System initialized. Awaiting user interaction.',
    },
    {
      time: '10:45:01.045',
      level: 'INFO',
      message: 'Loaded pinned hashes for api.example.com',
    },
    {
      time: '10:45:01.046',
      level: 'INFO',
      message: 'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
    },
  ]);

  const testConnection = () => {
    const stamp = new Date().toISOString().slice(11, 23);
    setLogs(prev => [
      ...prev,
      {
        time: stamp,
        level: 'INFO',
        message: 'TLS handshake started → api.example.com:443',
      },
      {
        time: stamp,
        level: 'SUCCESS',
        message: 'Pin matched. Connection secure.',
      },
    ]);
  };

  const simulateInvalid = () => {
    const stamp = new Date().toISOString().slice(11, 23);
    setLogs(prev => [
      ...prev,
      {
        time: stamp,
        level: 'WARN',
        message: 'Presented certificate hash mismatch',
      },
      {
        time: stamp,
        level: 'ERR',
        message: 'Connection aborted by pin policy',
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        {paddingBottom: insets.bottom + spacing.lg},
      ]}>
      <View style={styles.statusRow}>
        <StatusBadge status="practicing" />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}>
        {TABS.map(item => (
          <Text
            key={item}
            variant="labelCaps"
            color={item === tab ? colors.primaryFixedDim : colors.outline}
            style={[styles.tab, item === tab && styles.tabActive]}
            onPress={() => setTab(item)}>
            {item}
          </Text>
        ))}
      </ScrollView>

      {tab === 'DEMO' ? (
        <>
          <View style={styles.metrics}>
            <View style={styles.metricCard}>
              <Text variant="labelCaps" color={colors.outline}>
                CONNECTION
              </Text>
              <View style={styles.secureRow}>
                <Icon icon={Lock} size={16} color={colors.primaryFixedDim} />
                <Text variant="headlineSm" color={colors.primaryFixedDim}>
                  Secure
                </Text>
              </View>
            </View>
            <View style={styles.metricCard}>
              <Text variant="labelCaps" color={colors.outline}>
                PIN STATUS
              </Text>
              <Text variant="headlineSm" color={colors.primaryFixedDim}>
                MATCHED
              </Text>
            </View>
          </View>

          <View style={styles.hostCard}>
            <Text variant="labelCaps" color={colors.outline}>
              TARGET HOST
            </Text>
            <View style={styles.hostField}>
              <Icon icon={Server} size={16} color={colors.outline} />
              <Text variant="codeMd">api.example.com</Text>
            </View>
          </View>

          <LabButton
            label="TEST CONNECTION"
            icon={<Icon icon={Play} size={14} color={colors.onPrimary} />}
            onPress={testConnection}
          />
          <LabButton
            label="SIMULATE INVALID CERTIFICATE"
            icon={<Icon icon={AlertTriangle} size={14} color={colors.error} />}
            variant="danger"
            onPress={simulateInvalid}
          />

          <TerminalLog title="TERMINAL LOG" lines={logs} />
        </>
      ) : (
        <View style={styles.placeholder}>
          <Text variant="bodyMd" color={colors.onSurfaceVariant}>
            {tab} panel scaffold — implement content next.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.marginMobile,
    gap: spacing.md,
  },
  statusRow: {
    alignItems: 'flex-end',
  },
  tabs: {
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.xs,
  },
  tab: {
    paddingBottom: spacing.xs,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryFixedDim,
  },
  metrics: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    gap: spacing.xs,
  },
  hostCard: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    gap: spacing.xs,
  },
  hostField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
  },
  placeholder: {
    paddingVertical: spacing.xl,
  },
});
