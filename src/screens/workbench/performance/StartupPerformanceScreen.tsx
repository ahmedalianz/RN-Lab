import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function StartupPerformanceScreen() {
  return (
    <WorkbenchScreen
      title="Startup Performance"
      domainLabel="Performance Lab"
      accentColor={categoryColors.performance}
      description="TTI / TTFD breakdown"
      path="src/experiments/performance/startup"
    />
  );
}
