import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {useForm} from 'react-hook-form';

import AppScreen from '@appComp/AppScreen';
import Header from '@appComp/Header';
import {RootStackList} from '@appTypes/navigators.enum';
import {Input, List} from '@components';
import {useStackNavigation} from '@utils/navigators';

export default function PokeDex() {
  const {navigation} = useStackNavigation();
  const {control} = useForm();

  const data = [1, 2, 3, 4, 5, 3, 4];

  return (
    <AppScreen>
      <Header title="Pokedex" />

      <Input control={control} fieldName="search" />

      <List
        data={data}
        numColumns={2}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              className="border rounded-lg overflow-hidden"
              onPress={() =>
                navigation.navigate(RootStackList.PokeDetail, item)
              }>
              <View className="p-8 bg-slate-800" />
              <Text>{item?.toString()}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </AppScreen>
  );
}
