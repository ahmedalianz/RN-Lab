import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function RenderingPerformanceScreen() {
  return (
    <WorkbenchScreen
      title="Rendering Performance"
      domainLabel="Performance Lab"
      accentColor={categoryColors.performance}
      description="Commit / paint metrics"
      path="src/experiments/performance/rendering"
    />
  );
}
