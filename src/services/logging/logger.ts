import {AppState, type AppStateStatus} from 'react-native';
import type {LogModule, LogResult, StructuredLogEntry} from './types';

const MAX_ENTRIES = 200;

type LogListener = (entries: StructuredLogEntry[]) => void;

let sequence = 0;
const entries: StructuredLogEntry[] = [];
const listeners = new Set<LogListener>();

function notify(): void {
  const snapshot = [...entries];
  listeners.forEach(listener => listener(snapshot));
}

function createId(): string {
  sequence += 1;
  return `${Date.now()}-${sequence}`;
}

export type LogInput = {
  module: LogModule;
  event: string;
  payload?: unknown;
  appState?: AppStateStatus | string;
  result?: LogResult;
  error?: string;
};

/**
 * Structured logger shared by all playground modules.
 * Keeps an in-memory ring buffer for the Diagnostics screen.
 */
export function logEvent(input: LogInput): StructuredLogEntry {
  const entry: StructuredLogEntry = {
    id: createId(),
    timestamp: new Date().toISOString(),
    module: input.module,
    event: input.event,
    payload: input.payload,
    appState: input.appState ?? AppState.currentState,
    result: input.result,
    error: input.error,
  };

  entries.unshift(entry);
  if (entries.length > MAX_ENTRIES) {
    entries.length = MAX_ENTRIES;
  }

  if (__DEV__) {
    // Keep console output readable for Metro / Xcode / Logcat.
    // eslint-disable-next-line no-console
    console.log(
      `[${entry.module}] ${entry.event}`,
      entry.result ?? '',
      entry.payload ?? '',
      entry.error ?? '',
    );
  }

  notify();
  return entry;
}

export function getLogEntries(): StructuredLogEntry[] {
  return [...entries];
}

export function getLatestLogForModule(
  module: LogModule,
): StructuredLogEntry | undefined {
  return entries.find(entry => entry.module === module);
}

export function clearLogs(): void {
  entries.length = 0;
  notify();
}

export function subscribeToLogs(listener: LogListener): () => void {
  listeners.add(listener);
  listener([...entries]);
  return () => {
    listeners.delete(listener);
  };
}
