import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function FileSystemPlaygroundScreen() {
  return (
    <WorkbenchScreen
      title="File System Playground"
      domainLabel="Storage Lab"
      accentColor={categoryColors.storage}
      description="Paths, blobs, downloads"
      path="src/experiments/storage/filesystem"
    />
  );
}
