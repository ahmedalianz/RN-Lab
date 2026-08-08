import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {colors} from '../../../theme';

export function RnArchitectureOverviewScreen() {
  return (
    <WorkbenchScreen
      title="RN Architecture Overview"
      domainLabel="RN Internals"
      accentColor={colors.tertiaryContainer}
      description="Old vs New Architecture map"
      path="src/experiments/rn-internals/architecture"
    />
  );
}
