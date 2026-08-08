import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function NetworkTimingScreen() {
  return (
    <WorkbenchScreen
      title="Network Timing"
      domainLabel="Networking Lab"
      accentColor={categoryColors.networking}
      description="DNS → TTFB → download"
      path="src/experiments/networking/timing"
    />
  );
}
