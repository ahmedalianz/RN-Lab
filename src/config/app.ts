/**
 * App-level constants for the Advanced React Native Playground.
 * Feature-specific config (pins, schemes, channels) will live near each feature.
 */

export const APP_CONFIG = {
  name: 'RN Lab',
  displayName: 'Advanced RN Playground',
  /** Custom URL scheme reserved for deep-linking experiments (Phase 2+). */
  urlScheme: 'myapp',
} as const;
