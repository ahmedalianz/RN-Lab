import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {colors} from '../../../theme';

export function JsiPlaygroundScreen() {
  return (
    <WorkbenchScreen
      title="JSI Playground"
      domainLabel="RN Internals"
      accentColor={colors.tertiaryContainer}
      description="Shared JS/native runtime access"
      path="src/experiments/rn-internals/jsi"
    />
  );
}
