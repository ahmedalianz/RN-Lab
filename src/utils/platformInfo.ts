import {Platform} from 'react-native';

/**
 * Best-effort RN version string for diagnostics.
 * Prefers Platform.constants when present; falls back to package metadata.
 */
export function getReactNativeVersion(): string {
  const fromPlatform = Platform.constants?.reactNativeVersion;
  if (fromPlatform) {
    const {major, minor, patch, prerelease} = fromPlatform;
    const base = `${major}.${minor}.${patch}`;
    return prerelease ? `${base}-${prerelease}` : base;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require('react-native/package.json') as {version?: string};
    return pkg.version ?? 'unknown';
  } catch {
    return 'unknown';
  }
}
