import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function StateManagementPlaygroundScreen() {
  return (
    <WorkbenchScreen
      title="State Management Playground"
      domainLabel="React / JavaScript"
      accentColor={categoryColors.react}
      description="Local vs shared vs derived state"
      path="src/experiments/react-js/state"
    />
  );
}
