import React from 'react';

import {useForm} from 'react-hook-form';

import AppScreen from '@appComp/AppScreen';
import Header from '@appComp/Header';
import PokemonList from '@appComp/PokemonList';
import {RootStackList} from '@appTypes/navigators.enum';
import {Icon, Input} from '@components';
import {useStackNavigation} from '@utils/navigators';

export default function PokeDex() {
  const {navigation} = useStackNavigation();
  const {control} = useForm();

  const data = [1, 2, 3, 4, 5, 3, 4];

  function navigateFavorites() {
    navigation.navigate(RootStackList.PokeFavorites);
  }

  return (
    <AppScreen>
      <Header
        title="Pokedex"
        rightAccessory={<Icon name="heart" onPress={navigateFavorites} />}
      />

      <Input control={control} fieldName="search" />

      <PokemonList data={data} />
    </AppScreen>
  );
}
