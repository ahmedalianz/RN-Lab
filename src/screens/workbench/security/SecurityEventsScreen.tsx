import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function SecurityEventsScreen() {
  return (
    <WorkbenchScreen
      title="Security Events"
      domainLabel="Security Lab"
      accentColor={categoryColors.security}
      description="Audit log stream"
      path="src/experiments/security/events"
    />
  );
}
