import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {colors} from '../../../theme';

export function NewArchitectureComparisonScreen() {
  return (
    <WorkbenchScreen
      title="New Architecture Comparison"
      domainLabel="RN Internals"
      accentColor={colors.tertiaryContainer}
      description="Side-by-side legacy vs new"
      path="src/experiments/rn-internals/comparison"
    />
  );
}
