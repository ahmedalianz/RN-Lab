import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Panel} from '../../../components/Panel';
import {CatalogRow} from '../../../components/Screen';
import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {Text} from '../../../components/Text';
import type {LabsStackParamList} from '../../../navigation/types';
import {categoryColors, colors, spacing} from '../../../theme';

const SENSORS = [
  {
    id: 'accelerometer',
    title: 'Accelerometer',
    subtitle: 'Linear acceleration · m/s²',
  },
  {
    id: 'gyroscope',
    title: 'Gyroscope',
    subtitle: 'Angular velocity · rad/s',
  },
  {
    id: 'magnetometer',
    title: 'Magnetometer',
    subtitle: 'Magnetic field · µT',
  },
] as const;

export function SensorsLabScreen() {
  return (
    <WorkbenchScreen
      title="Sensors Lab"
      domainLabel="Hardware Lab"
      accentColor={categoryColors.hardware}
      description="Accelerometer, Gyroscope, and Magnetometer in one workbench — not three screens."
      path="src/experiments/hardware/sensors">
      <Text variant="labelCaps" color={colors.outline}>
        Sensor channels
      </Text>
      {SENSORS.map(sensor => (
        <Panel key={sensor.id} accentColor={categoryColors.hardware} style={styles.card}>
          <View style={styles.row}>
            <Text variant="bodyLg">{sensor.title}</Text>
            <Text variant="labelCaps" color={colors.statusNotStarted}>
              Idle
            </Text>
          </View>
          <Text variant="bodyMd" color={colors.onSurfaceVariant}>
            {sensor.subtitle}
          </Text>
          <Text variant="metricDisplay" color={colors.primaryContainer}>
            0.00
          </Text>
          <Text variant="codeSm" color={colors.outline}>
            live stream pending
          </Text>
        </Panel>
      ))}
    </WorkbenchScreen>
  );
}

export function DeviceCapabilitiesScreen() {
  return (
    <WorkbenchScreen
      title="Device Capabilities"
      domainLabel="Hardware Lab"
      accentColor={categoryColors.hardware}
      description="Haptics and Battery folded into capabilities — no separate lab screens."
      path="src/experiments/hardware/capabilities">
      <Panel accentColor={categoryColors.hardware} style={styles.card}>
        <Text variant="labelCaps" color={categoryColors.hardware}>
          Haptics
        </Text>
        <Text variant="bodyMd" color={colors.onSurfaceVariant}>
          Impact / notification / selection feedback
        </Text>
        <Text variant="codeSm" color={colors.outline}>
          section → haptics
        </Text>
      </Panel>
      <Panel accentColor={colors.primaryContainer} style={styles.card}>
        <Text variant="labelCaps" color={categoryColors.hardware}>
          Battery
        </Text>
        <Text variant="bodyMd" color={colors.onSurfaceVariant}>
          Level, charging state, low-power mode
        </Text>
        <Text variant="codeSm" color={colors.outline}>
          section → battery
        </Text>
      </Panel>
      <Panel style={styles.card}>
        <Text variant="labelCaps" color={colors.outline}>
          Feature flags
        </Text>
        <Text variant="codeSm" color={colors.onSurfaceVariant}>
          camera · mic · ble · nfc · biometrics
        </Text>
      </Panel>
    </WorkbenchScreen>
  );
}

export function BluetoothScannerScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<LabsStackParamList>>();

  return (
    <WorkbenchScreen
      title="Bluetooth Scanner"
      domainLabel="Hardware Lab"
      accentColor={categoryColors.hardware}
      description="Scan nearby peripherals, then open device details."
      path="src/experiments/hardware/bluetooth">
      <CatalogRow
        title="Demo Device"
        subtitle="AA:BB:CC:DD:EE:FF · mock peripheral"
        meta="RSSI -62"
        accentColor={categoryColors.hardware}
        onPress={() => navigation.navigate('BluetoothDeviceDetails')}
      />
    </WorkbenchScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
