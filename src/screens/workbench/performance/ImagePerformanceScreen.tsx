import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function ImagePerformanceScreen() {
  return (
    <WorkbenchScreen
      title="Image Performance"
      domainLabel="Performance Lab"
      accentColor={categoryColors.performance}
      description="Decode, cache, resize"
      path="src/experiments/performance/images"
    />
  );
}
