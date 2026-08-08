import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function RequestResponseDetailsScreen() {
  return (
    <WorkbenchScreen
      title="Request / Response Details"
      domainLabel="Networking Lab"
      accentColor={categoryColors.networking}
      description="Headers, body, timing"
      path="src/experiments/networking/request-details"
    />
  );
}
