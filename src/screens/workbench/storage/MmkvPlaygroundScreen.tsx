import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function MmkvPlaygroundScreen() {
  return (
    <WorkbenchScreen
      title="MMKV Playground"
      domainLabel="Storage Lab"
      accentColor={categoryColors.storage}
      description="Sync high-perf KV"
      path="src/experiments/storage/mmkv"
    />
  );
}
