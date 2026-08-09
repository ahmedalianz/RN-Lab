import {useCallback, useState} from 'react';
import {
  INITIAL_CLOSURE_SCOPE,
  applyCallFunction,
} from '../experiments/javascript/closureScope';

export function useClosureScope() {
  const [state, setState] = useState(INITIAL_CLOSURE_SCOPE);

  const callFunction = useCallback(() => {
    setState(applyCallFunction);
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_CLOSURE_SCOPE);
  }, []);

  return {
    count: state.count,
    stepHighlight: state.stepHighlight,
    callFunction,
    reset,
  };
}
