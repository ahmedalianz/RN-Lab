import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ReferenceArticleScreen} from '../screens/core/ReferenceArticleScreen';
import {ReferenceLibraryScreen} from '../screens/core/ReferenceLibraryScreen';
import {stackScreenOptions} from './options';
import type {ReferenceStackParamList} from './types';

const Stack = createNativeStackNavigator<ReferenceStackParamList>();

export function ReferenceNavigator() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="ReferenceLibrary"
        component={ReferenceLibraryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReferenceArticle"
        component={ReferenceArticleScreen}
        options={{title: 'Article'}}
      />
    </Stack.Navigator>
  );
}
