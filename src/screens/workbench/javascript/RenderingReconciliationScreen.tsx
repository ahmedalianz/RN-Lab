import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function RenderingReconciliationScreen() {
  return (
    <WorkbenchScreen
      title="Rendering & Reconciliation"
      domainLabel="React / JavaScript"
      accentColor={categoryColors.react}
      description="Fiber work loops and commits"
      path="src/experiments/react-js/reconciliation"
    />
  );
}
