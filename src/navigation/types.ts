import type {NavigatorScreenParams} from '@react-navigation/native';

export type HomeStackParamList = {
  HomeDashboard: undefined;
};

export type ExperimentsStackParamList = {
  Experiments: undefined;
  ExperimentDetails: {experimentId: string};
  JavaScriptEventLoop: undefined;
  PromiseExecution: undefined;
  ClosureMemory: undefined;
  RenderingReconciliation: undefined;
  ReactMemoization: undefined;
  StateManagementPlayground: undefined;
  AsyncPatterns: undefined;
  HermesRuntime: undefined;
};

export type LabsStackParamList = {
  LabDashboard: undefined;
  ReactJsDashboard: undefined;
  RnInternalsDashboard: undefined;
  NativeModulesCatalog: undefined;
  NativeModuleDetails: {moduleId: string};
  HardwareDashboard: undefined;
  SecurityDashboard: undefined;
  PerformanceDashboard: undefined;
  NetworkDashboard: undefined;
  StorageDashboard: undefined;
  JavaScriptEventLoop: undefined;
  PromiseExecution: undefined;
  ClosureMemory: undefined;
  RenderingReconciliation: undefined;
  ReactMemoization: undefined;
  StateManagementPlayground: undefined;
  AsyncPatterns: undefined;
  HermesRuntime: undefined;
  RnArchitectureOverview: undefined;
  BridgePlayground: undefined;
  JsiPlayground: undefined;
  TurboModulePlayground: undefined;
  FabricPlayground: undefined;
  CodegenExplorer: undefined;
  NewArchitectureComparison: undefined;
  JsNativeCommunication: undefined;
  CameraLab: undefined;
  MicrophoneLab: undefined;
  SensorsLab: undefined;
  BluetoothScanner: undefined;
  BluetoothDeviceDetails: undefined;
  NfcLab: undefined;
  LocationLab: undefined;
  DeviceCapabilities: undefined;
  SslCertificatePinning: undefined;
  CertificateInspector: undefined;
  TlsConnectionInspector: undefined;
  SecureStorage: undefined;
  KeychainKeystore: undefined;
  BiometricAuthentication: undefined;
  DeviceIntegrity: undefined;
  RootJailbreakDetection: undefined;
  AppAttestation: undefined;
  ScreenshotProtection: undefined;
  SecurityEvents: undefined;
  RenderingPerformance: undefined;
  ListPerformance: undefined;
  JsThreadMonitor: undefined;
  UiThreadMonitor: undefined;
  MemoryMonitor: undefined;
  MemoryLeakPlayground: undefined;
  ImagePerformance: undefined;
  AnimationPerformance: undefined;
  StartupPerformance: undefined;
  PerformanceBenchmarkResults: undefined;
  HttpRequestInspector: undefined;
  RequestResponseDetails: undefined;
  NetworkTiming: undefined;
  RetryBackoffPlayground: undefined;
  RequestCancellation: undefined;
  TokenRefreshPlayground: undefined;
  OfflineNetworkSimulator: undefined;
  StorageComparison: undefined;
  AsyncStoragePlayground: undefined;
  MmkvPlayground: undefined;
  SqlitePlayground: undefined;
  FileSystemPlayground: undefined;
  StorageBenchmark: undefined;
};

export type ReferenceStackParamList = {
  ReferenceLibrary: undefined;
  ReferenceArticle: {articleId: string};
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ExperimentsTab: NavigatorScreenParams<ExperimentsStackParamList>;
  LabsTab: NavigatorScreenParams<LabsStackParamList>;
  ReferenceTab: NavigatorScreenParams<ReferenceStackParamList>;
};

export type RootStackParamList = {
  Splash: undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  GlobalSearch: undefined;
  Settings: undefined;
};
