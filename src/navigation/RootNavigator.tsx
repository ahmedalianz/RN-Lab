import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GlobalSearchScreen} from '../screens/core/GlobalSearchScreen';
import {SettingsScreen} from '../screens/core/SettingsScreen';
import {SplashScreen} from '../screens/core/SplashScreen';
import {colors} from '../theme';
import {MainTabs} from './MainTabs';
import {stackScreenOptions} from './options';
import type {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const labTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surfaceContainer,
    text: colors.onSurface,
    border: colors.border,
    primary: colors.primaryContainer,
    notification: colors.secondary,
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={labTheme}>
      <Stack.Navigator screenOptions={stackScreenOptions}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GlobalSearch"
          component={GlobalSearchScreen}
          options={{presentation: 'modal', title: 'Search'}}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{title: 'Settings'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
