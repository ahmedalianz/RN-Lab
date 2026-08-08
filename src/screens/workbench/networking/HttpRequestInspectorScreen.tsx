import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function HttpRequestInspectorScreen() {
  return (
    <WorkbenchScreen
      title="HTTP Request Inspector"
      domainLabel="Networking Lab"
      accentColor={categoryColors.networking}
      description="Outgoing call list"
      path="src/experiments/networking/http-inspector"
    />
  );
}
