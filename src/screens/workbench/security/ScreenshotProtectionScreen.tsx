import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function ScreenshotProtectionScreen() {
  return (
    <WorkbenchScreen
      title="Screenshot Protection"
      domainLabel="Security Lab"
      accentColor={categoryColors.security}
      description="FLAG_SECURE & blur tricks"
      path="src/experiments/security/screenshot"
    />
  );
}
