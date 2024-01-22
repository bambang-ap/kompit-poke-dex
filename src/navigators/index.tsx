import * as React from 'react';
import {Text} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackList, RootStackParamList} from '@appTypes/navigators.enum';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={RootStackList.Pokedex}>
      <Stack.Screen
        name={RootStackList.Pokedex}
        component={() => <Text>try</Text>}
      />
    </Stack.Navigator>
  );
}
