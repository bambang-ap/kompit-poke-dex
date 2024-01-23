import React from 'react';

import {useRecoilValue} from 'recoil';

import AppScreen from '@appComp/AppScreen';
import Header from '@appComp/Header';
import PokemonList from '@appComp/PokemonList';
import {atomFavorites} from '@recoils';
import {useStackNavigation} from '@utils/navigators';

export default function PokeFavorites() {
  const {navigation} = useStackNavigation();

  const favorites = useRecoilValue(atomFavorites);

  return (
    <AppScreen>
      <Header title="Favorite Pokemon" onBack={navigation.goBack} />

      <PokemonList data={favorites} />
    </AppScreen>
  );
}
