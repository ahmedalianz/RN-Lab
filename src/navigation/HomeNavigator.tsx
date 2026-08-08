import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeDashboardScreen} from '../screens/core/HomeDashboardScreen';
import {stackScreenOptions} from './options';
import type {HomeStackParamList} from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="HomeDashboard"
        component={HomeDashboardScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
