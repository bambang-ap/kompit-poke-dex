import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackList, RootStackParamList} from '@appTypes/navigators.enum';
import ControllerScreen from '@screens/Controller';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={RootStackList.Pokedex}>
      <Stack.Screen name={RootStackList.Pokedex} component={ControllerScreen} />
    </Stack.Navigator>
  );
}
