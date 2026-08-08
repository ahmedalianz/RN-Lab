import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function KeychainKeystoreScreen() {
  return (
    <WorkbenchScreen
      title="Keychain / Keystore"
      domainLabel="Security Lab"
      accentColor={categoryColors.security}
      description="Platform secret vaults"
      path="src/experiments/security/keychain"
    />
  );
}
