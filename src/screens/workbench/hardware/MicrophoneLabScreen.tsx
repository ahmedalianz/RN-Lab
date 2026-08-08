import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function MicrophoneLabScreen() {
  return (
    <WorkbenchScreen
      title="Microphone Lab"
      domainLabel="Hardware Lab"
      accentColor={categoryColors.hardware}
      description="Audio session & metering"
      path="src/experiments/hardware/microphone"
    />
  );
}
