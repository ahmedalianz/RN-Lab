import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function AsyncPatternsScreen() {
  return (
    <WorkbenchScreen
      title="Async Patterns"
      domainLabel="React / JavaScript"
      accentColor={categoryColors.react}
      description="Cancellation, races, sequencing"
      path="src/experiments/react-js/async"
    />
  );
}
