import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function AsyncStoragePlaygroundScreen() {
  return (
    <WorkbenchScreen
      title="AsyncStorage Playground"
      domainLabel="Storage Lab"
      accentColor={categoryColors.storage}
      description="Key-value async API"
      path="src/experiments/storage/async-storage"
    />
  );
}
