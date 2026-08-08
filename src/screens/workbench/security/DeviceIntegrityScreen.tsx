import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function DeviceIntegrityScreen() {
  return (
    <WorkbenchScreen
      title="Device Integrity"
      domainLabel="Security Lab"
      accentColor={categoryColors.security}
      description="Compromise signals"
      path="src/experiments/security/integrity"
    />
  );
}
