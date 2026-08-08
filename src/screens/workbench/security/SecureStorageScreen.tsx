import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function SecureStorageScreen() {
  return (
    <WorkbenchScreen
      title="Secure Storage"
      domainLabel="Security Lab"
      accentColor={categoryColors.security}
      description="Encrypted persistence patterns"
      path="src/experiments/security/secure-storage"
    />
  );
}
