import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function CertificateInspectorScreen() {
  return (
    <WorkbenchScreen
      title="Certificate Inspector"
      domainLabel="Security Lab"
      accentColor={categoryColors.security}
      description="Chain validation & metadata"
      path="src/experiments/security/cert-inspector"
    />
  );
}
