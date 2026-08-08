import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function ListPerformanceScreen() {
  return (
    <WorkbenchScreen
      title="List Performance"
      domainLabel="Performance Lab"
      accentColor={categoryColors.performance}
      description="FlatList / FlashList tradeoffs"
      path="src/experiments/performance/lists"
    />
  );
}
