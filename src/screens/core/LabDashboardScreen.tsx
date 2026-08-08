import {Pressable, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {LucideIcon} from 'lucide-react-native';
import {
  Bluetooth,
  Camera,
  ChevronRight,
  Cpu,
  Mic,
} from 'lucide-react-native';
import {AppHeader} from '../../components/AppHeader';
import {Icon} from '../../components/Icon';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {labDomains} from '../../data/catalog';
import {navigateToRoute} from '../../navigation/navigate';
import type {LabsStackParamList} from '../../navigation/types';
import {colors, radii, spacing} from '../../theme';

const HARDWARE_STATUS: Array<{
  id: string;
  title: string;
  detail: string;
  route: string;
  icon: LucideIcon;
}> = [
  {
    id: 'camera',
    title: 'Camera',
    detail: 'Multi-lens array active',
    route: 'CameraLab',
    icon: Camera,
  },
  {
    id: 'microphone',
    title: 'Microphone',
    detail: 'Stereo array active',
    route: 'MicrophoneLab',
    icon: Mic,
  },
  {
    id: 'bluetooth',
    title: 'Bluetooth',
    detail: 'BLE ready',
    route: 'BluetoothScanner',
    icon: Bluetooth,
  },
];

export function LabDashboardScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<LabsStackParamList>>();

  return (
    <View style={styles.root}>
      <AppHeader
        showSearch={false}
        onSettingsPress={() =>
          navigation.getParent()?.getParent()?.navigate('Settings' as never)
        }
      />
      <Screen contentStyle={styles.content}>
        <View style={styles.hero}>
          <Text variant="headlineMd">Hardware Diagnostic</Text>
          <Text variant="codeSm" color={colors.onSurfaceVariant}>
            System capabilities and device specifications overview.
          </Text>
        </View>

        <View style={styles.specsCard}>
          <View style={styles.specsHeader}>
            <Text variant="labelCaps" color={colors.primaryFixedDim}>
              DEVICE SPECS
            </Text>
            <Icon icon={Cpu} size={16} color={colors.primaryFixedDim} />
          </View>
          <View style={styles.divider} />
          {[
            ['Model', 'Simulator / Emulator'],
            ['OS', 'iOS / Android'],
            ['CPU Arch', 'arm64'],
            ['New Architecture', 'Enabled'],
            ['Hermes', 'Enabled'],
          ].map(([label, value]) => (
            <View key={label} style={styles.specRow}>
              <Text variant="codeSm" color={colors.outline}>
                {label}
              </Text>
              <Text variant="codeSm">{value}</Text>
            </View>
          ))}
        </View>

        {HARDWARE_STATUS.map(item => (
          <Pressable
            key={item.id}
            onPress={() => navigateToRoute(navigation, item.route)}
            style={({pressed}) => [styles.hwCard, pressed && styles.pressed]}>
            <View style={styles.hwTop}>
              <Icon icon={item.icon} size={18} color={colors.outline} />
              <View style={styles.available}>
                <View style={styles.availableDot} />
                <Text variant="labelCaps" color={colors.statusMastered}>
                  Available
                </Text>
              </View>
            </View>
            <Text variant="headlineSm">{item.title}</Text>
            <Text variant="codeSm" color={colors.onSurfaceVariant}>
              {item.detail}
            </Text>
          </Pressable>
        ))}

        <Text variant="labelCaps" color={colors.outline}>
          LAB DOMAINS
        </Text>
        {labDomains.map(domain => (
          <Pressable
            key={domain.id}
            onPress={() => navigateToRoute(navigation, domain.dashboardRoute)}
            style={({pressed}) => [
              styles.domainRow,
              {borderLeftColor: domain.accent},
              pressed && styles.pressed,
            ]}>
            <View style={styles.domainBody}>
              <Text variant="bodyLg">{domain.title}</Text>
              <Text variant="codeSm" color={colors.onSurfaceVariant}>
                {domain.description}
              </Text>
            </View>
            <Icon icon={ChevronRight} size={16} color={colors.outline} />
          </Pressable>
        ))}
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  hero: {
    gap: spacing.xs,
  },
  specsCard: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    gap: spacing.xs,
  },
  specsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.outlineVariant,
    marginVertical: spacing.xs,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  hwCard: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
    gap: spacing.xs,
  },
  hwTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  available: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.statusMastered,
    borderRadius: radii.full,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    backgroundColor: 'rgba(34,197,94,0.12)',
  },
  availableDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.statusMastered,
  },
  domainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    borderRadius: radii.default,
    padding: spacing.containerPadding,
  },
  domainBody: {
    flex: 1,
    gap: 4,
  },
  pressed: {
    opacity: 0.85,
  },
});
