import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function PerformanceBenchmarkResultsScreen() {
  return (
    <WorkbenchScreen
      title="Performance Benchmark Results"
      domainLabel="Performance Lab"
      accentColor={categoryColors.performance}
      description="Historical runs"
      path="src/experiments/performance/benchmarks"
    />
  );
}
