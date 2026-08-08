import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function StorageComparisonScreen() {
  return (
    <WorkbenchScreen
      title="Storage Comparison"
      domainLabel="Storage Lab"
      accentColor={categoryColors.storage}
      description="When to use what"
      path="src/experiments/storage/comparison"
    />
  );
}
