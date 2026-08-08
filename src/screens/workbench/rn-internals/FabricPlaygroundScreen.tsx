import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {colors} from '../../../theme';

export function FabricPlaygroundScreen() {
  return (
    <WorkbenchScreen
      title="Fabric Playground"
      domainLabel="RN Internals"
      accentColor={colors.tertiaryContainer}
      description="Concurrent rendering & shadow tree"
      path="src/experiments/rn-internals/fabric"
    />
  );
}
