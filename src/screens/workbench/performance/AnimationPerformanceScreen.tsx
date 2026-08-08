import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function AnimationPerformanceScreen() {
  return (
    <WorkbenchScreen
      title="Animation Performance"
      domainLabel="Performance Lab"
      accentColor={categoryColors.performance}
      description="JS vs native drivers"
      path="src/experiments/performance/animation"
    />
  );
}
