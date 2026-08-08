import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function TlsConnectionInspectorScreen() {
  return (
    <WorkbenchScreen
      title="TLS Connection Inspector"
      domainLabel="Security Lab"
      accentColor={categoryColors.security}
      description="Cipher suites and handshake"
      path="src/experiments/security/tls"
    />
  );
}
