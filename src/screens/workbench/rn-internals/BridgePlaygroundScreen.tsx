import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {colors} from '../../../theme';

export function BridgePlaygroundScreen() {
  return (
    <WorkbenchScreen
      title="Bridge Playground"
      domainLabel="RN Internals"
      accentColor={colors.tertiaryContainer}
      description="Async JSON bridge messaging"
      path="src/experiments/rn-internals/bridge"
    />
  );
}
