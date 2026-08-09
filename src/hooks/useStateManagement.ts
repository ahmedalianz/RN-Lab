import {useCallback, useState} from 'react';
import {
  DEFAULT_PAYLOADS,
  INITIAL_APP_STATE,
  INITIAL_STATE_LOGS,
  INITIAL_STATE_METRICS,
  applyDispatch,
  parsePayload,
  type AppState,
  type StateActionType,
  type StateLogLine,
  type StateMetrics,
  type StateNodeId,
  type StateStrategy,
} from '../experiments/javascript/stateManagement';

export function useStateManagement() {
  const [strategy, setStrategy] = useState<StateStrategy>('useState');
  const [action, setAction] = useState<StateActionType>('INCREMENT_COUNT');
  const [payloadText, setPayloadText] = useState(
    DEFAULT_PAYLOADS.INCREMENT_COUNT,
  );
  const [appState, setAppState] = useState<AppState>(INITIAL_APP_STATE);
  const [metrics, setMetrics] = useState<StateMetrics>(INITIAL_STATE_METRICS);
  const [logs, setLogs] = useState<StateLogLine[]>(INITIAL_STATE_LOGS);
  const [highlighted, setHighlighted] = useState<StateNodeId[]>([]);
  const [error, setError] = useState<string | null>(null);

  const selectStrategy = useCallback((id: StateStrategy) => {
    setStrategy(id);
    setHighlighted([]);
  }, []);

  const selectAction = useCallback((id: StateActionType) => {
    setAction(id);
    setPayloadText(DEFAULT_PAYLOADS[id]);
    setError(null);
  }, []);

  const dispatchAction = useCallback(() => {
    const parsed = parsePayload(action, payloadText);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }

    setError(null);
    const result = applyDispatch(
      appState,
      metrics,
      logs,
      strategy,
      action,
      parsed,
    );
    setAppState(result.state);
    setMetrics(result.metrics);
    setLogs(result.logs);
    setHighlighted(result.highlighted);
  }, [action, appState, logs, metrics, payloadText, strategy]);

  const reset = useCallback(() => {
    setAppState(INITIAL_APP_STATE);
    setMetrics(INITIAL_STATE_METRICS);
    setLogs(INITIAL_STATE_LOGS);
    setHighlighted([]);
    setAction('INCREMENT_COUNT');
    setPayloadText(DEFAULT_PAYLOADS.INCREMENT_COUNT);
    setError(null);
  }, []);

  return {
    strategy,
    action,
    payloadText,
    setPayloadText,
    appState,
    metrics,
    logs,
    highlighted,
    error,
    selectStrategy,
    selectAction,
    dispatchAction,
    reset,
  };
}
