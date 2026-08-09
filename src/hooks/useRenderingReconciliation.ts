import {useCallback, useState} from 'react';
import {
  INITIAL_RECONCILE_STATE,
  applyReconcileAction,
  type ReconcileState,
} from '../experiments/javascript/renderingReconciliation';

export function useRenderingReconciliation() {
  const [state, setState] = useState<ReconcileState>(INITIAL_RECONCILE_STATE);

  const incrementState = useCallback(() => {
    setState(prev => applyReconcileAction(prev, 'incrementState'));
  }, []);

  const changeProps = useCallback(() => {
    setState(prev => applyReconcileAction(prev, 'changeProps'));
  }, []);

  const forceRender = useCallback(() => {
    setState(prev => applyReconcileAction(prev, 'forceRender'));
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_RECONCILE_STATE);
  }, []);

  return {
    tree: state.tree,
    metrics: state.metrics,
    logs: state.logs,
    activeNodeId: state.activeNodeId,
    incrementState,
    changeProps,
    forceRender,
    reset,
  };
}
