import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ExperimentDetailsScreen} from '../screens/core/ExperimentDetailsScreen';
import {ExperimentsScreen} from '../screens/core/ExperimentsScreen';
import {
  AsyncPatternsScreen,
  ClosureMemoryScreen,
  HermesRuntimeScreen,
  JavaScriptEventLoopScreen,
  PromiseExecutionScreen,
  ReactMemoizationScreen,
  RenderingReconciliationScreen,
  StateManagementPlaygroundScreen,
} from '../screens/workbench';
import {stackScreenOptions} from './options';
import type {ExperimentsStackParamList} from './types';

const Stack = createNativeStackNavigator<ExperimentsStackParamList>();

export function ExperimentsNavigator() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="Experiments"
        component={ExperimentsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ExperimentDetails"
        component={ExperimentDetailsScreen}
        options={{title: 'Experiment'}}
      />
      <Stack.Screen
        name="JavaScriptEventLoop"
        component={JavaScriptEventLoopScreen}
        options={{title: 'Event Loop'}}
      />
      <Stack.Screen
        name="PromiseExecution"
        component={PromiseExecutionScreen}
        options={{title: 'Promises'}}
      />
      <Stack.Screen
        name="ClosureMemory"
        component={ClosureMemoryScreen}
        options={{title: 'Closures'}}
      />
      <Stack.Screen
        name="RenderingReconciliation"
        component={RenderingReconciliationScreen}
        options={{title: 'Reconciliation'}}
      />
      <Stack.Screen
        name="ReactMemoization"
        component={ReactMemoizationScreen}
        options={{title: 'Memoization'}}
      />
      <Stack.Screen
        name="StateManagementPlayground"
        component={StateManagementPlaygroundScreen}
        options={{title: 'State'}}
      />
      <Stack.Screen
        name="AsyncPatterns"
        component={AsyncPatternsScreen}
        options={{title: 'Async'}}
      />
      <Stack.Screen
        name="HermesRuntime"
        component={HermesRuntimeScreen}
        options={{title: 'Hermes'}}
      />
    </Stack.Navigator>
  );
}
