import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {colors} from '../../../theme';

export function JsNativeCommunicationScreen() {
  return (
    <WorkbenchScreen
      title="JS ↔ Native Communication"
      domainLabel="RN Internals"
      accentColor={colors.tertiaryContainer}
      description="Events, promises, sync JSI calls"
      path="src/experiments/rn-internals/communication"
    />
  );
}
