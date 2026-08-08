import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function UiThreadMonitorScreen() {
  return (
    <WorkbenchScreen
      title="UI Thread Monitor"
      domainLabel="Performance Lab"
      accentColor={categoryColors.performance}
      description="Frame drops & FPS"
      path="src/experiments/performance/ui-thread"
    />
  );
}
