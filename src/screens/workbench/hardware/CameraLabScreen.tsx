import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function CameraLabScreen() {
  return (
    <WorkbenchScreen
      title="Camera Lab"
      domainLabel="Hardware Lab"
      accentColor={categoryColors.hardware}
      description="Capture, permissions, frames"
      path="src/experiments/hardware/camera"
    />
  );
}
