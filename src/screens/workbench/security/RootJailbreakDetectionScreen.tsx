import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function RootJailbreakDetectionScreen() {
  return (
    <WorkbenchScreen
      title="Root / Jailbreak Detection"
      domainLabel="Security Lab"
      accentColor={categoryColors.security}
      description="Heuristic checks"
      path="src/experiments/security/root-detection"
    />
  );
}
