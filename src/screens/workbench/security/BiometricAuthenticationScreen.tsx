import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function BiometricAuthenticationScreen() {
  return (
    <WorkbenchScreen
      title="Biometric Authentication"
      domainLabel="Security Lab"
      accentColor={categoryColors.security}
      description="Local auth + unlock secrets"
      path="src/experiments/security/biometrics"
    />
  );
}
