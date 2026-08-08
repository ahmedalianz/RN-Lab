import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function MemoryMonitorScreen() {
  return (
    <WorkbenchScreen
      title="Memory Monitor"
      domainLabel="Performance Lab"
      accentColor={categoryColors.performance}
      description="Heap & native footprint"
      path="src/experiments/performance/memory"
    />
  );
}
