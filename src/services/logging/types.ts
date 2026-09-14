export type LogModule =
  | 'notifications'
  | 'deep-linking'
  | 'ssl-pinning'
  | 'diagnostics'
  | 'navigation'
  | 'app';

export type LogResult =
  | 'ok'
  | 'queued'
  | 'ignored'
  | 'error'
  | 'pending'
  | string;

export type StructuredLogEntry = {
  id: string;
  timestamp: string;
  module: LogModule;
  event: string;
  payload?: unknown;
  appState?: string;
  result?: LogResult;
  error?: string;
};
