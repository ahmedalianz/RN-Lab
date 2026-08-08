import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function JsThreadMonitorScreen() {
  return (
    <WorkbenchScreen
      title="JS Thread Monitor"
      domainLabel="Performance Lab"
      accentColor={categoryColors.performance}
      description="Event loop saturation"
      path="src/experiments/performance/js-thread"
    />
  );
}
