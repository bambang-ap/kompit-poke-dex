import React from 'react';

import AppScreen from '@appComp/AppScreen';
import Header from '@appComp/Header';
import PokemonList from '@appComp/PokemonList';
import {useStackNavigation} from '@utils/navigators';

export default function PokeFavorites() {
  const {navigation} = useStackNavigation();

  return (
    <AppScreen>
      <Header title="Favorite Pokemon" onBack={navigation.goBack} />

      <PokemonList data={[1, 2, 3, 4, 5]} />
    </AppScreen>
  );
}
