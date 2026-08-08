import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function AppAttestationScreen() {
  return (
    <WorkbenchScreen
      title="App Attestation"
      domainLabel="Security Lab"
      accentColor={categoryColors.security}
      description="Play Integrity / App Attest"
      path="src/experiments/security/attestation"
    />
  );
}
