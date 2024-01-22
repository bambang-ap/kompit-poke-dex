import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackList, RootStackParamList} from '@appTypes/navigators.enum';
import PokeDetail from '@screens/PokeDetail';
import PokeDex from '@screens/PokeDex';
import PokeFavorites from '@screens/PokeFavorites';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={RootStackList.Pokedex}>
      <Stack.Screen name={RootStackList.Pokedex} component={PokeDex} />
      <Stack.Screen name={RootStackList.PokeDetail} component={PokeDetail} />
      <Stack.Screen
        name={RootStackList.PokeFavorites}
        component={PokeFavorites}
      />
    </Stack.Navigator>
  );
}
