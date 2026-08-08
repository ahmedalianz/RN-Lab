import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function SqlitePlaygroundScreen() {
  return (
    <WorkbenchScreen
      title="SQLite Playground"
      domainLabel="Storage Lab"
      accentColor={categoryColors.storage}
      description="Relational queries"
      path="src/experiments/storage/sqlite"
    />
  );
}
