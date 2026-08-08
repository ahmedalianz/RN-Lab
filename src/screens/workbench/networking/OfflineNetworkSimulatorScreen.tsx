import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function OfflineNetworkSimulatorScreen() {
  return (
    <WorkbenchScreen
      title="Offline Network Simulator"
      domainLabel="Networking Lab"
      accentColor={categoryColors.networking}
      description="Latency, drops, airplane mode"
      path="src/experiments/networking/offline"
    />
  );
}
