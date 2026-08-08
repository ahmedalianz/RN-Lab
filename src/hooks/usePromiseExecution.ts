import {useCallback, useState} from 'react';
import {
  EMPTY_PROMISE_SNAPSHOT,
  PROMISE_SCENARIOS,
  type ScenarioId,
  type StepSnapshot,
} from '../experiments/javascript/promiseExecution';

export function usePromiseExecution() {
  const [scenario, setScenario] = useState<ScenarioId>('resolve');
  const [step, setStep] = useState(-1);

  const snapshots = PROMISE_SCENARIOS[scenario];
  const current: StepSnapshot =
    step < 0
      ? EMPTY_PROMISE_SNAPSHOT
      : snapshots[Math.min(step, snapshots.length - 1)];
  const done = step >= snapshots.length - 1;

  const nextStep = useCallback(() => {
    setStep(prev => {
      if (prev >= snapshots.length - 1 && prev >= 0) {
        return prev;
      }
      return Math.min(prev + 1, snapshots.length - 1);
    });
  }, [snapshots.length]);

  const runAll = useCallback(() => {
    setStep(snapshots.length - 1);
  }, [snapshots.length]);

  const reset = useCallback(() => {
    setStep(-1);
  }, []);

  const selectScenario = useCallback((id: ScenarioId) => {
    setScenario(id);
    setStep(-1);
  }, []);

  return {
    scenario,
    current,
    done,
    selectScenario,
    nextStep,
    runAll,
    reset,
  };
}
