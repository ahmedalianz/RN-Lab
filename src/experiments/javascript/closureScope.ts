import {colors} from '../../theme';

export type CodeLine = {
  text: string;
  color: string;
};

export type ClosureScopeState = {
  count: number;
  stepHighlight: number;
};

export const CODE_LINES: CodeLine[] = [
  {text: 'function createCounter() {', color: colors.onSurfaceVariant},
  {text: '  let count = 0;', color: colors.onSurfaceVariant},
  {text: '  return function() {', color: colors.onSurfaceVariant},
  {text: '    count += 1;', color: colors.onSurfaceVariant},
  {text: '    return count;', color: colors.onSurfaceVariant},
  {text: '  };', color: colors.onSurfaceVariant},
  {text: '}', color: colors.onSurfaceVariant},
  {text: '', color: colors.onSurfaceVariant},
  {text: 'const counter = createCounter();', color: colors.onSurfaceVariant},
  {
    text: 'console.log(counter()); // Breakpoint',
    color: colors.primaryFixedDim,
  },
];

export const INITIAL_CLOSURE_SCOPE: ClosureScopeState = {
  count: 1,
  stepHighlight: 9,
};


export function applyCallFunction(state: ClosureScopeState): ClosureScopeState {
  return {
    ...state,
    count: state.count + 1,
    stepHighlight: 4,
  };
}
