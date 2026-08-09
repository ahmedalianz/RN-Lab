import {useCallback, useState} from 'react';
import {
  INITIAL_MEMO_METRICS,
  applyMemoAction,
  type MemoAction,
  type MemoLogLine,
  type MemoMetrics,
  type MemoTechnique,
} from '../experiments/javascript/reactMemoization';

type MemoSession = {
  metrics: MemoMetrics;
  logs: MemoLogLine[];
};

const INITIAL_SESSION: MemoSession = {
  metrics: INITIAL_MEMO_METRICS,
  logs: [],
};

export function useReactMemoization() {
  const [technique, setTechnique] = useState<MemoTechnique>('memo');
  const [session, setSession] = useState<MemoSession>(INITIAL_SESSION);

  const selectTechnique = useCallback((id: MemoTechnique) => {
    setTechnique(id);
  }, []);

  const runAction = useCallback(
    (action: MemoAction) => {
      setSession(prev => {
        const result = applyMemoAction(prev.metrics, technique, action);
        return {
          metrics: result.metrics,
          logs: [result.log, ...prev.logs].slice(0, 12),
        };
      });
    },
    [technique],
  );

  const updateParent = useCallback(() => {
    runAction('updateParent');
  }, [runAction]);

  const changeProps = useCallback(() => {
    runAction('changeProps');
  }, [runAction]);

  const reset = useCallback(() => {
    setSession(INITIAL_SESSION);
  }, []);

  return {
    technique,
    metrics: session.metrics,
    logs: session.logs,
    selectTechnique,
    updateParent,
    changeProps,
    reset,
  };
}
