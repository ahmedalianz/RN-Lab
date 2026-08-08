import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function TokenRefreshPlaygroundScreen() {
  return (
    <WorkbenchScreen
      title="Token Refresh Playground"
      domainLabel="Networking Lab"
      accentColor={categoryColors.networking}
      description="Single-flight refresh queues"
      path="src/experiments/networking/token-refresh"
    />
  );
}
