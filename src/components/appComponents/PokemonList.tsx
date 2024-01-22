import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {TPokemon} from '@appTypes/app.zod';
import {RootStackList} from '@appTypes/navigators.enum';
import {List} from '@components';
import {useStackNavigation} from '@utils/navigators';

type Props = {
  data: TPokemon[];
};

export default function PokemonList({data}: Props) {
  const {navigation} = useStackNavigation();

  return (
    <List
      data={data}
      numColumns={2}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            className="border rounded-lg overflow-hidden"
            onPress={() => navigation.navigate(RootStackList.PokeDetail, item)}>
            <View className="p-8 bg-slate-800" />
            <Text>{item?.toString()}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}
