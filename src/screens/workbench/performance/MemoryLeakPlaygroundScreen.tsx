import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function MemoryLeakPlaygroundScreen() {
  return (
    <WorkbenchScreen
      title="Memory Leak Playground"
      domainLabel="Performance Lab"
      accentColor={categoryColors.performance}
      description="Reproduce and detect leaks"
      path="src/experiments/performance/leaks"
    />
  );
}
