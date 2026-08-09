export type ExperimentStatus = 'not_started' | 'practicing' | 'mastered';

export type LabDomainId =
  | 'react-js'
  | 'rn-internals'
  | 'native-modules'
  | 'hardware'
  | 'security'
  | 'performance'
  | 'networking'
  | 'storage';

export type ExperimentTrack = 'javascript' | 'react';

export type CatalogItem = {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  status: ExperimentStatus;
  /** Distinguishes JS vs React items inside the react-js domain */
  track?: ExperimentTrack;
  /** Shown as sections inside a parent screen instead of its own route */
  embedded?: boolean;
};

export type LabDomain = {
  id: LabDomainId;
  title: string;
  emoji: string;
  accent: string;
  description: string;
  dashboardRoute: string;
  items: CatalogItem[];
};

export const STATUS_LABEL: Record<ExperimentStatus, string> = {
  not_started: 'Not started',
  practicing: 'Practicing',
  mastered: 'Mastered',
};

export const labDomains: LabDomain[] = [
  {
    id: 'react-js',
    title: 'React / JavaScript',
    emoji: '🧪',
    accent: '#61dafb',
    description: 'Event loop, promises, reconciliation, Hermes.',
    dashboardRoute: 'ReactJsDashboard',
    items: [
      {
        id: 'js-event-loop',
        title: 'JavaScript Event Loop',
        subtitle: 'Call stack, macrotasks, microtasks',
        route: 'JavaScriptEventLoop',
        status: 'not_started',
        track: 'javascript',
      },
      {
        id: 'promise-execution',
        title: 'Promise Execution',
        subtitle: 'then/catch ordering and scheduling',
        route: 'PromiseExecution',
        status: 'not_started',
        track: 'javascript',
      },
      {
        id: 'closure-scope',
        title: 'Closures & Lexical Scope',
        subtitle: 'Captured variables and scope chains',
        route: 'ClosureScope',
        status: 'not_started',
        track: 'javascript',
      },
      {
        id: 'memory-retention',
        title: 'Memory Retention',
        subtitle: 'Heap pressure, leaks, and GC eligibility',
        route: 'MemoryRetention',
        status: 'not_started',
        track: 'javascript',
      },
      {
        id: 'hermes-runtime',
        title: 'Hermes Runtime',
        subtitle: 'Bytecode, GC, engine flags',
        route: 'HermesRuntime',
        status: 'not_started',
        track: 'javascript',
      },
      {
        id: 'rendering-reconciliation',
        title: 'Rendering & Reconciliation',
        subtitle: 'Fiber work loops and commits',
        route: 'RenderingReconciliation',
        status: 'not_started',
        track: 'react',
      },
      {
        id: 'react-memoization',
        title: 'React Memoization',
        subtitle: 'memo, useMemo, useCallback tradeoffs',
        route: 'ReactMemoization',
        status: 'not_started',
        track: 'react',
      },
      {
        id: 'state-management',
        title: 'State Management Playground',
        subtitle: 'Local vs shared vs derived state',
        route: 'StateManagementPlayground',
        status: 'not_started',
        track: 'react',
      }
    ],
  },
  {
    id: 'rn-internals',
    title: 'React Native Internals',
    emoji: '📱',
    accent: '#ebb9ff',
    description: 'Bridge, JSI, TurboModules, Fabric, Codegen.',
    dashboardRoute: 'RnInternalsDashboard',
    items: [
      {
        id: 'rn-architecture',
        title: 'RN Architecture Overview',
        subtitle: 'Old vs New Architecture map',
        route: 'RnArchitectureOverview',
        status: 'not_started',
      },
      {
        id: 'bridge-playground',
        title: 'Bridge Playground',
        subtitle: 'Async JSON bridge messaging',
        route: 'BridgePlayground',
        status: 'not_started',
      },
      {
        id: 'jsi-playground',
        title: 'JSI Playground',
        subtitle: 'Shared JS/native runtime access',
        route: 'JsiPlayground',
        status: 'not_started',
      },
      {
        id: 'turbomodule-playground',
        title: 'TurboModule Playground',
        subtitle: 'Lazy native module loading',
        route: 'TurboModulePlayground',
        status: 'not_started',
      },
      {
        id: 'fabric-playground',
        title: 'Fabric Playground',
        subtitle: 'Concurrent rendering & shadow tree',
        route: 'FabricPlayground',
        status: 'not_started',
      },
      {
        id: 'codegen-explorer',
        title: 'Codegen Explorer',
        subtitle: 'Specs → generated native bindings',
        route: 'CodegenExplorer',
        status: 'not_started',
      },
      {
        id: 'new-arch-comparison',
        title: 'New Architecture Comparison',
        subtitle: 'Side-by-side legacy vs new',
        route: 'NewArchitectureComparison',
        status: 'not_started',
      },
      {
        id: 'js-native-comm',
        title: 'JS ↔ Native Communication',
        subtitle: 'Events, promises, sync JSI calls',
        route: 'JsNativeCommunication',
        status: 'not_started',
      },
    ],
  },
  {
    id: 'native-modules',
    title: 'Native Modules',
    emoji: '🔧',
    accent: '#ffb875',
    description: 'Catalog + details — small modules live in Details.',
    dashboardRoute: 'NativeModulesCatalog',
    items: [
      {
        id: 'native-modules-catalog',
        title: 'Native Modules Catalog',
        subtitle: 'Browse all lab native modules',
        route: 'NativeModulesCatalog',
        status: 'not_started',
      },
      {
        id: 'battery',
        title: 'Battery Native Module',
        subtitle: 'Level, charging, low-power mode',
        route: 'NativeModuleDetails',
        status: 'not_started',
      },
      {
        id: 'device-info',
        title: 'Device Info Module',
        subtitle: 'Model, OS, identifiers',
        route: 'NativeModuleDetails',
        status: 'not_started',
      },
      {
        id: 'haptics',
        title: 'Haptics Module',
        subtitle: 'Impact / notification feedback',
        route: 'NativeModuleDetails',
        status: 'not_started',
      },
      {
        id: 'biometrics',
        title: 'Biometrics Module',
        subtitle: 'Face ID / fingerprint prompts',
        route: 'NativeModuleDetails',
        status: 'not_started',
      },
      {
        id: 'native-events',
        title: 'Native Events Playground',
        subtitle: 'Emitter ↔ JS listeners',
        route: 'NativeModuleDetails',
        status: 'not_started',
      },
      {
        id: 'native-storage',
        title: 'Native Storage Module',
        subtitle: 'Keychain / Keystore wrappers',
        route: 'NativeModuleDetails',
        status: 'not_started',
      },
    ],
  },
  {
    id: 'hardware',
    title: 'Hardware Lab',
    emoji: '📷',
    accent: '#5cd5f6',
    description: 'Camera, sensors, BT, NFC, GPS — consolidated.',
    dashboardRoute: 'HardwareDashboard',
    items: [
      {
        id: 'hw-dashboard',
        title: 'Hardware Dashboard',
        subtitle: 'Capability matrix & quick jumps',
        route: 'HardwareDashboard',
        status: 'not_started',
      },
      {
        id: 'camera',
        title: 'Camera Lab',
        subtitle: 'Capture, permissions, frames',
        route: 'CameraLab',
        status: 'not_started',
      },
      {
        id: 'microphone',
        title: 'Microphone Lab',
        subtitle: 'Audio session & metering',
        route: 'MicrophoneLab',
        status: 'not_started',
      },
      {
        id: 'sensors',
        title: 'Sensors Lab',
        subtitle: 'Accelerometer · Gyroscope · Magnetometer',
        route: 'SensorsLab',
        status: 'not_started',
      },
      {
        id: 'bluetooth',
        title: 'Bluetooth Scanner',
        subtitle: 'Scan + device details',
        route: 'BluetoothScanner',
        status: 'not_started',
      },
      {
        id: 'nfc',
        title: 'NFC Lab',
        subtitle: 'Tag read / write flows',
        route: 'NfcLab',
        status: 'not_started',
      },
      {
        id: 'location',
        title: 'GPS / Location Lab',
        subtitle: 'Accuracy, background, geofence',
        route: 'LocationLab',
        status: 'not_started',
      },
      {
        id: 'device-capabilities',
        title: 'Device Capabilities',
        subtitle: 'Haptics · Battery · feature flags',
        route: 'DeviceCapabilities',
        status: 'not_started',
      },
    ],
  },
  {
    id: 'security',
    title: 'Security Lab',
    emoji: '🔐',
    accent: '#ffb4ab',
    description: 'Pinning, keystore, integrity, attestation.',
    dashboardRoute: 'SecurityDashboard',
    items: [
      {
        id: 'sec-dashboard',
        title: 'Security Dashboard',
        subtitle: 'Threat surface overview',
        route: 'SecurityDashboard',
        status: 'not_started',
      },
      {
        id: 'ssl-pinning',
        title: 'SSL Certificate Pinning',
        subtitle: 'Pin sets and failure modes',
        route: 'SslCertificatePinning',
        status: 'not_started',
      },
      {
        id: 'cert-inspector',
        title: 'Certificate Inspector',
        subtitle: 'Chain validation & metadata',
        route: 'CertificateInspector',
        status: 'not_started',
      },
      {
        id: 'tls-inspector',
        title: 'TLS Connection Inspector',
        subtitle: 'Cipher suites and handshake',
        route: 'TlsConnectionInspector',
        status: 'not_started',
      },
      {
        id: 'secure-storage',
        title: 'Secure Storage',
        subtitle: 'Encrypted persistence patterns',
        route: 'SecureStorage',
        status: 'not_started',
      },
      {
        id: 'keychain-keystore',
        title: 'Keychain / Keystore',
        subtitle: 'Platform secret vaults',
        route: 'KeychainKeystore',
        status: 'not_started',
      },
      {
        id: 'biometric-auth',
        title: 'Biometric Authentication',
        subtitle: 'Local auth + unlock secrets',
        route: 'BiometricAuthentication',
        status: 'not_started',
      },
      {
        id: 'device-integrity',
        title: 'Device Integrity',
        subtitle: 'Compromise signals',
        route: 'DeviceIntegrity',
        status: 'not_started',
      },
      {
        id: 'root-jailbreak',
        title: 'Root / Jailbreak Detection',
        subtitle: 'Heuristic checks',
        route: 'RootJailbreakDetection',
        status: 'not_started',
      },
      {
        id: 'app-attestation',
        title: 'App Attestation',
        subtitle: 'Play Integrity / App Attest',
        route: 'AppAttestation',
        status: 'not_started',
      },
      {
        id: 'screenshot-protection',
        title: 'Screenshot Protection',
        subtitle: 'FLAG_SECURE & blur tricks',
        route: 'ScreenshotProtection',
        status: 'not_started',
      },
      {
        id: 'security-events',
        title: 'Security Events',
        subtitle: 'Audit log stream',
        route: 'SecurityEvents',
        status: 'not_started',
      },
    ],
  },
  {
    id: 'performance',
    title: 'Performance Lab',
    emoji: '⚡',
    accent: '#e08100',
    description: 'JS/UI threads, memory, lists, startup.',
    dashboardRoute: 'PerformanceDashboard',
    items: [
      {
        id: 'perf-dashboard',
        title: 'Performance Dashboard',
        subtitle: 'Live vitals overview',
        route: 'PerformanceDashboard',
        status: 'not_started',
      },
      {
        id: 'rendering-perf',
        title: 'Rendering Performance',
        subtitle: 'Commit / paint metrics',
        route: 'RenderingPerformance',
        status: 'not_started',
      },
      {
        id: 'list-perf',
        title: 'List Performance',
        subtitle: 'FlatList / FlashList tradeoffs',
        route: 'ListPerformance',
        status: 'not_started',
      },
      {
        id: 'js-thread',
        title: 'JS Thread Monitor',
        subtitle: 'Event loop saturation',
        route: 'JsThreadMonitor',
        status: 'not_started',
      },
      {
        id: 'ui-thread',
        title: 'UI Thread Monitor',
        subtitle: 'Frame drops & FPS',
        route: 'UiThreadMonitor',
        status: 'not_started',
      },
      {
        id: 'memory-monitor',
        title: 'Memory Monitor',
        subtitle: 'Heap & native footprint',
        route: 'MemoryMonitor',
        status: 'not_started',
      },
      {
        id: 'memory-leak',
        title: 'Memory Leak Playground',
        subtitle: 'Reproduce and detect leaks',
        route: 'MemoryLeakPlayground',
        status: 'not_started',
      },
      {
        id: 'image-perf',
        title: 'Image Performance',
        subtitle: 'Decode, cache, resize',
        route: 'ImagePerformance',
        status: 'not_started',
      },
      {
        id: 'animation-perf',
        title: 'Animation Performance',
        subtitle: 'JS vs native drivers',
        route: 'AnimationPerformance',
        status: 'not_started',
      },
      {
        id: 'startup-perf',
        title: 'Startup Performance',
        subtitle: 'TTI / TTFD breakdown',
        route: 'StartupPerformance',
        status: 'not_started',
      },
      {
        id: 'benchmark-results',
        title: 'Performance Benchmark Results',
        subtitle: 'Historical runs',
        route: 'PerformanceBenchmarkResults',
        status: 'not_started',
      },
    ],
  },
  {
    id: 'networking',
    title: 'Networking Lab',
    emoji: '🌐',
    accent: '#bfefff',
    description: 'HTTP, retries, cancellation, offline.',
    dashboardRoute: 'NetworkDashboard',
    items: [
      {
        id: 'net-dashboard',
        title: 'Network Dashboard',
        subtitle: 'Traffic overview',
        route: 'NetworkDashboard',
        status: 'not_started',
      },
      {
        id: 'http-inspector',
        title: 'HTTP Request Inspector',
        subtitle: 'Outgoing call list',
        route: 'HttpRequestInspector',
        status: 'not_started',
      },
      {
        id: 'request-details',
        title: 'Request / Response Details',
        subtitle: 'Headers, body, timing',
        route: 'RequestResponseDetails',
        status: 'not_started',
      },
      {
        id: 'network-timing',
        title: 'Network Timing',
        subtitle: 'DNS → TTFB → download',
        route: 'NetworkTiming',
        status: 'not_started',
      },
      {
        id: 'retry-backoff',
        title: 'Retry & Backoff Playground',
        subtitle: 'Exponential / jitter strategies',
        route: 'RetryBackoffPlayground',
        status: 'not_started',
      },
      {
        id: 'request-cancellation',
        title: 'Request Cancellation',
        subtitle: 'AbortController patterns',
        route: 'RequestCancellation',
        status: 'not_started',
      },
      {
        id: 'token-refresh',
        title: 'Token Refresh Playground',
        subtitle: 'Single-flight refresh queues',
        route: 'TokenRefreshPlayground',
        status: 'not_started',
      },
      {
        id: 'offline-simulator',
        title: 'Offline Network Simulator',
        subtitle: 'Latency, drops, airplane mode',
        route: 'OfflineNetworkSimulator',
        status: 'not_started',
      },
    ],
  },
  {
    id: 'storage',
    title: 'Storage Lab',
    emoji: '💾',
    accent: '#879397',
    description: 'AsyncStorage, MMKV, SQLite, FS.',
    dashboardRoute: 'StorageDashboard',
    items: [
      {
        id: 'storage-dashboard',
        title: 'Storage Dashboard',
        subtitle: 'Persistence map',
        route: 'StorageDashboard',
        status: 'not_started',
      },
      {
        id: 'storage-comparison',
        title: 'Storage Comparison',
        subtitle: 'When to use what',
        route: 'StorageComparison',
        status: 'not_started',
      },
      {
        id: 'async-storage',
        title: 'AsyncStorage Playground',
        subtitle: 'Key-value async API',
        route: 'AsyncStoragePlayground',
        status: 'not_started',
      },
      {
        id: 'mmkv',
        title: 'MMKV Playground',
        subtitle: 'Sync high-perf KV',
        route: 'MmkvPlayground',
        status: 'not_started',
      },
      {
        id: 'sqlite',
        title: 'SQLite Playground',
        subtitle: 'Relational queries',
        route: 'SqlitePlayground',
        status: 'not_started',
      },
      {
        id: 'filesystem',
        title: 'File System Playground',
        subtitle: 'Paths, blobs, downloads',
        route: 'FileSystemPlayground',
        status: 'not_started',
      },
      {
        id: 'storage-benchmark',
        title: 'Storage Benchmark',
        subtitle: 'Throughput bake-off',
        route: 'StorageBenchmark',
        status: 'not_started',
      },
    ],
  },
];

export const referenceArticles = [
  {
    id: 'new-architecture',
    title: 'New Architecture Primer',
    subtitle: 'Fabric + TurboModules + JSI',
  },
  {
    id: 'threading-model',
    title: 'RN Threading Model',
    subtitle: 'JS, UI, and background threads',
  },
  {
    id: 'security-checklist',
    title: 'Mobile Security Checklist',
    subtitle: 'Pinning, storage, attestation',
  },
];

export function getDomain(id: LabDomainId): LabDomain {
  const domain = labDomains.find(d => d.id === id);
  if (!domain) {
    throw new Error(`Unknown lab domain: ${id}`);
  }
  return domain;
}

export function getAllWorkbenchItems(): CatalogItem[] {
  return labDomains.flatMap(domain =>
    domain.items.filter(item => item.route !== domain.dashboardRoute),
  );
}

export function countExperiments(): number {
  return labDomains.reduce((sum, domain) => sum + domain.items.length, 0);
}
