import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function BluetoothDeviceDetailsScreen() {
  return (
    <WorkbenchScreen
      title="Bluetooth Device Details"
      domainLabel="Hardware Lab"
      accentColor={categoryColors.hardware}
      description="GATT services & characteristics"
      path="src/experiments/hardware/bluetooth"
    />
  );
}
