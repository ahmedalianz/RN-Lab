import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function RequestCancellationScreen() {
  return (
    <WorkbenchScreen
      title="Request Cancellation"
      domainLabel="Networking Lab"
      accentColor={categoryColors.networking}
      description="AbortController patterns"
      path="src/experiments/networking/cancellation"
    />
  );
}
