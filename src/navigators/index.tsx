import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackList, RootStackParamList} from '@appTypes/navigators.enum';
import PokeDex from '@screens/PokeDex';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={RootStackList.Pokedex}>
      <Stack.Screen name={RootStackList.Pokedex} component={PokeDex} />
    </Stack.Navigator>
  );
}
