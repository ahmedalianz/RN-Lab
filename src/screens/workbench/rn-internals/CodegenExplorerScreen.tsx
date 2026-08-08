import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {colors} from '../../../theme';

export function CodegenExplorerScreen() {
  return (
    <WorkbenchScreen
      title="Codegen Explorer"
      domainLabel="RN Internals"
      accentColor={colors.tertiaryContainer}
      description="Specs → generated native bindings"
      path="src/experiments/rn-internals/codegen"
    />
  );
}
