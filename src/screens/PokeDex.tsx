import React from 'react';

import {useForm} from 'react-hook-form';

import AppScreen from '@appComp/AppScreen';
import Header from '@appComp/Header';
import PokemonList from '@appComp/PokemonList';
import {RootStackList} from '@appTypes/navigators.enum';
import {Icon, Input} from '@components';
import {usePokemonList} from '@query';
import {useStackNavigation} from '@utils/navigators';

export default function PokeDex() {
  const {navigation} = useStackNavigation();
  const {control} = useForm();

  const {
    dataMapped = [],
    hasNextPage = false,
    isFetchingNextPage,
    fetchNextPage,
  } = usePokemonList();

  function navigateFavorites() {
    navigation.navigate(RootStackList.PokeFavorites);
  }

  return (
    <AppScreen>
      <Header
        title="Pokedex"
        rightAccessory={
          <Icon className="text-xl" name="heart" onPress={navigateFavorites} />
        }
      />

      <Input
        placeholder="Search by name..."
        control={control}
        fieldName="search"
      />

      <PokemonList
        data={dataMapped}
        pagination={{
          isFetchingNextPage,
          hasNextPage,
          fetchNextPage,
        }}
      />
    </AppScreen>
  );
}
