import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function RetryBackoffPlaygroundScreen() {
  return (
    <WorkbenchScreen
      title="Retry & Backoff Playground"
      domainLabel="Networking Lab"
      accentColor={categoryColors.networking}
      description="Exponential / jitter strategies"
      path="src/experiments/networking/retry"
    />
  );
}
