import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function StorageBenchmarkScreen() {
  return (
    <WorkbenchScreen
      title="Storage Benchmark"
      domainLabel="Storage Lab"
      accentColor={categoryColors.storage}
      description="Throughput bake-off"
      path="src/experiments/storage/benchmark"
    />
  );
}
