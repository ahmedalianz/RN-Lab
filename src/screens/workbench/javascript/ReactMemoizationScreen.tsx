import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function ReactMemoizationScreen() {
  return (
    <WorkbenchScreen
      title="React Memoization"
      domainLabel="React / JavaScript"
      accentColor={categoryColors.react}
      description="memo, useMemo, useCallback tradeoffs"
      path="src/experiments/react-js/memoization"
    />
  );
}
