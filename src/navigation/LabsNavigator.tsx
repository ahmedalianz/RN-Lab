import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LabDashboardScreen} from '../screens/core/LabDashboardScreen';
import {
  HardwareDashboardScreen,
  NetworkDashboardScreen,
  PerformanceDashboardScreen,
  ReactJsDashboardScreen,
  RnInternalsDashboardScreen,
  SecurityDashboardScreen,
  StorageDashboardScreen,
} from '../screens/labs/dashboards';
import {NativeModuleDetailsScreen} from '../screens/labs/NativeModuleDetailsScreen';
import {NativeModulesCatalogScreen} from '../screens/labs/NativeModulesCatalogScreen';
import {
  JavaScriptEventLoopScreen,
  PromiseExecutionScreen,
  ClosureScopeScreen,
  MemoryRetentionScreen,
  RenderingReconciliationScreen,
  ReactMemoizationScreen,
  StateManagementPlaygroundScreen,
  HermesRuntimeScreen,
  RnArchitectureOverviewScreen,
  BridgePlaygroundScreen,
  JsiPlaygroundScreen,
  TurboModulePlaygroundScreen,
  FabricPlaygroundScreen,
  CodegenExplorerScreen,
  NewArchitectureComparisonScreen,
  JsNativeCommunicationScreen,
  CameraLabScreen,
  MicrophoneLabScreen,
  SensorsLabScreen,
  BluetoothScannerScreen,
  BluetoothDeviceDetailsScreen,
  NfcLabScreen,
  LocationLabScreen,
  DeviceCapabilitiesScreen,
  SslCertificatePinningScreen,
  CertificateInspectorScreen,
  TlsConnectionInspectorScreen,
  SecureStorageScreen,
  KeychainKeystoreScreen,
  BiometricAuthenticationScreen,
  DeviceIntegrityScreen,
  RootJailbreakDetectionScreen,
  AppAttestationScreen,
  ScreenshotProtectionScreen,
  SecurityEventsScreen,
  RenderingPerformanceScreen,
  ListPerformanceScreen,
  JsThreadMonitorScreen,
  UiThreadMonitorScreen,
  MemoryMonitorScreen,
  MemoryLeakPlaygroundScreen,
  ImagePerformanceScreen,
  AnimationPerformanceScreen,
  StartupPerformanceScreen,
  PerformanceBenchmarkResultsScreen,
  HttpRequestInspectorScreen,
  RequestResponseDetailsScreen,
  NetworkTimingScreen,
  RetryBackoffPlaygroundScreen,
  RequestCancellationScreen,
  TokenRefreshPlaygroundScreen,
  OfflineNetworkSimulatorScreen,
  StorageComparisonScreen,
  AsyncStoragePlaygroundScreen,
  MmkvPlaygroundScreen,
  SqlitePlaygroundScreen,
  FileSystemPlaygroundScreen,
  StorageBenchmarkScreen,
} from '../screens/workbench';
import {stackScreenOptions} from './options';
import type {LabsStackParamList} from './types';

const Stack = createNativeStackNavigator<LabsStackParamList>();

export function LabsNavigator() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="LabDashboard"
        component={LabDashboardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ReactJsDashboard" component={ReactJsDashboardScreen} options={{title: 'React / JS'}} />
      <Stack.Screen name="RnInternalsDashboard" component={RnInternalsDashboardScreen} options={{title: 'RN Internals'}} />
      <Stack.Screen name="NativeModulesCatalog" component={NativeModulesCatalogScreen} options={{title: 'Native Modules'}} />
      <Stack.Screen name="NativeModuleDetails" component={NativeModuleDetailsScreen} options={{title: 'Module Details'}} />
      <Stack.Screen name="HardwareDashboard" component={HardwareDashboardScreen} options={{title: 'Hardware'}} />
      <Stack.Screen name="SecurityDashboard" component={SecurityDashboardScreen} options={{title: 'Security'}} />
      <Stack.Screen name="PerformanceDashboard" component={PerformanceDashboardScreen} options={{title: 'Performance'}} />
      <Stack.Screen name="NetworkDashboard" component={NetworkDashboardScreen} options={{title: 'Networking'}} />
      <Stack.Screen name="StorageDashboard" component={StorageDashboardScreen} options={{title: 'Storage'}} />
      <Stack.Screen name="JavaScriptEventLoop" component={JavaScriptEventLoopScreen} options={{title: 'Event Loop'}} />
      <Stack.Screen name="PromiseExecution" component={PromiseExecutionScreen} options={{title: 'Promise Execution'}} />
      <Stack.Screen name="ClosureScope" component={ClosureScopeScreen} options={{title: 'Closures'}} />
      <Stack.Screen name="MemoryRetention" component={MemoryRetentionScreen} options={{title: 'Memory Retention'}} />
      <Stack.Screen name="RenderingReconciliation" component={RenderingReconciliationScreen} options={{title: 'Rendering Reconciliation'}} />
      <Stack.Screen name="ReactMemoization" component={ReactMemoizationScreen} options={{title: 'React Memoization'}} />
      <Stack.Screen name="StateManagementPlayground" component={StateManagementPlaygroundScreen} options={{title: 'State Management Playground'}} />
      <Stack.Screen name="HermesRuntime" component={HermesRuntimeScreen} options={{title: 'Hermes Runtime'}} />
      <Stack.Screen name="RnArchitectureOverview" component={RnArchitectureOverviewScreen} options={{title: 'Rn Architecture Overview'}} />
      <Stack.Screen name="BridgePlayground" component={BridgePlaygroundScreen} options={{title: 'Bridge Playground'}} />
      <Stack.Screen name="JsiPlayground" component={JsiPlaygroundScreen} options={{title: 'Jsi Playground'}} />
      <Stack.Screen name="TurboModulePlayground" component={TurboModulePlaygroundScreen} options={{title: 'TurboModules'}} />
      <Stack.Screen name="FabricPlayground" component={FabricPlaygroundScreen} options={{title: 'Fabric Playground'}} />
      <Stack.Screen name="CodegenExplorer" component={CodegenExplorerScreen} options={{title: 'Codegen Explorer'}} />
      <Stack.Screen name="NewArchitectureComparison" component={NewArchitectureComparisonScreen} options={{title: 'New Architecture Comparison'}} />
      <Stack.Screen name="JsNativeCommunication" component={JsNativeCommunicationScreen} options={{title: 'Js Native Communication'}} />
      <Stack.Screen name="CameraLab" component={CameraLabScreen} options={{title: 'Camera Lab'}} />
      <Stack.Screen name="MicrophoneLab" component={MicrophoneLabScreen} options={{title: 'Microphone Lab'}} />
      <Stack.Screen name="SensorsLab" component={SensorsLabScreen} options={{title: 'Sensors Lab'}} />
      <Stack.Screen name="BluetoothScanner" component={BluetoothScannerScreen} options={{title: 'Bluetooth Scanner'}} />
      <Stack.Screen name="BluetoothDeviceDetails" component={BluetoothDeviceDetailsScreen} options={{title: 'Bluetooth Device Details'}} />
      <Stack.Screen name="NfcLab" component={NfcLabScreen} options={{title: 'Nfc Lab'}} />
      <Stack.Screen name="LocationLab" component={LocationLabScreen} options={{title: 'Location Lab'}} />
      <Stack.Screen name="DeviceCapabilities" component={DeviceCapabilitiesScreen} options={{title: 'Device Capabilities'}} />
      <Stack.Screen name="SslCertificatePinning" component={SslCertificatePinningScreen} options={{title: 'SECURITY - SSL Pinning'}} />
      <Stack.Screen name="CertificateInspector" component={CertificateInspectorScreen} options={{title: 'Certificate Inspector'}} />
      <Stack.Screen name="TlsConnectionInspector" component={TlsConnectionInspectorScreen} options={{title: 'Tls Connection Inspector'}} />
      <Stack.Screen name="SecureStorage" component={SecureStorageScreen} options={{title: 'Secure Storage'}} />
      <Stack.Screen name="KeychainKeystore" component={KeychainKeystoreScreen} options={{title: 'Keychain Keystore'}} />
      <Stack.Screen name="BiometricAuthentication" component={BiometricAuthenticationScreen} options={{title: 'Biometric Authentication'}} />
      <Stack.Screen name="DeviceIntegrity" component={DeviceIntegrityScreen} options={{title: 'Device Integrity'}} />
      <Stack.Screen name="RootJailbreakDetection" component={RootJailbreakDetectionScreen} options={{title: 'Root Jailbreak Detection'}} />
      <Stack.Screen name="AppAttestation" component={AppAttestationScreen} options={{title: 'App Attestation'}} />
      <Stack.Screen name="ScreenshotProtection" component={ScreenshotProtectionScreen} options={{title: 'Screenshot Protection'}} />
      <Stack.Screen name="SecurityEvents" component={SecurityEventsScreen} options={{title: 'Security Events'}} />
      <Stack.Screen name="RenderingPerformance" component={RenderingPerformanceScreen} options={{title: 'Rendering Performance'}} />
      <Stack.Screen name="ListPerformance" component={ListPerformanceScreen} options={{title: 'List Performance'}} />
      <Stack.Screen name="JsThreadMonitor" component={JsThreadMonitorScreen} options={{title: 'Js Thread Monitor'}} />
      <Stack.Screen name="UiThreadMonitor" component={UiThreadMonitorScreen} options={{title: 'Ui Thread Monitor'}} />
      <Stack.Screen name="MemoryMonitor" component={MemoryMonitorScreen} options={{title: 'Memory Monitor'}} />
      <Stack.Screen name="MemoryLeakPlayground" component={MemoryLeakPlaygroundScreen} options={{title: 'Memory Leak Playground'}} />
      <Stack.Screen name="ImagePerformance" component={ImagePerformanceScreen} options={{title: 'Image Performance'}} />
      <Stack.Screen name="AnimationPerformance" component={AnimationPerformanceScreen} options={{title: 'Animation Performance'}} />
      <Stack.Screen name="StartupPerformance" component={StartupPerformanceScreen} options={{title: 'Startup Performance'}} />
      <Stack.Screen name="PerformanceBenchmarkResults" component={PerformanceBenchmarkResultsScreen} options={{title: 'Performance Benchmark Results'}} />
      <Stack.Screen name="HttpRequestInspector" component={HttpRequestInspectorScreen} options={{title: 'Http Request Inspector'}} />
      <Stack.Screen name="RequestResponseDetails" component={RequestResponseDetailsScreen} options={{title: 'Request Response Details'}} />
      <Stack.Screen name="NetworkTiming" component={NetworkTimingScreen} options={{title: 'Network Timing'}} />
      <Stack.Screen name="RetryBackoffPlayground" component={RetryBackoffPlaygroundScreen} options={{title: 'Retry Backoff Playground'}} />
      <Stack.Screen name="RequestCancellation" component={RequestCancellationScreen} options={{title: 'Request Cancellation'}} />
      <Stack.Screen name="TokenRefreshPlayground" component={TokenRefreshPlaygroundScreen} options={{title: 'Token Refresh Playground'}} />
      <Stack.Screen name="OfflineNetworkSimulator" component={OfflineNetworkSimulatorScreen} options={{title: 'Offline Network Simulator'}} />
      <Stack.Screen name="StorageComparison" component={StorageComparisonScreen} options={{title: 'Storage Comparison'}} />
      <Stack.Screen name="AsyncStoragePlayground" component={AsyncStoragePlaygroundScreen} options={{title: 'Async Storage Playground'}} />
      <Stack.Screen name="MmkvPlayground" component={MmkvPlaygroundScreen} options={{title: 'Mmkv Playground'}} />
      <Stack.Screen name="SqlitePlayground" component={SqlitePlaygroundScreen} options={{title: 'Sqlite Playground'}} />
      <Stack.Screen name="FileSystemPlayground" component={FileSystemPlaygroundScreen} options={{title: 'File System Playground'}} />
      <Stack.Screen name="StorageBenchmark" component={StorageBenchmarkScreen} options={{title: 'Storage Benchmark'}} />
    </Stack.Navigator>
  );
}
