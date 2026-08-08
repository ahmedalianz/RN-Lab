import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function LocationLabScreen() {
  return (
    <WorkbenchScreen
      title="GPS / Location Lab"
      domainLabel="Hardware Lab"
      accentColor={categoryColors.hardware}
      description="Accuracy, background, geofence"
      path="src/experiments/hardware/location"
    />
  );
}
