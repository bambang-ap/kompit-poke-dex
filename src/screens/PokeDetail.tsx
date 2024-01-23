import React from 'react';
import {Image, Text, View} from 'react-native';

import {useRecoilState} from 'recoil';

import AppScreen from '@appComp/AppScreen';
import Header from '@appComp/Header';
import {TPokemonDetail} from '@appTypes/app.zod';
import {RootStackList} from '@appTypes/navigators.enum';
import {Icon, List, Spacer} from '@components';
import {usePokemonDetail} from '@query';
import {atomFavorites} from '@recoils';
import {favoriteToggler, getIdFromLastUrl} from '@utils/index';
import {useStackNavigation} from '@utils/navigators';

export default function PokeDetail() {
  const {navigation, route} = useStackNavigation<RootStackList.PokeDetail>();

  const [favorites, setFavorites] = useRecoilState(atomFavorites);
  const url = route.params.url;

  const id = getIdFromLastUrl(route.params.url);
  const isFavorite = favorites.findIndex(cur => cur.url === url) >= 0;

  const {data} = usePokemonDetail(id);

  const {sprites, abilities = [], name} = data ?? {};

  function toggleFavorite() {
    setFavorites(prev => {
      return favoriteToggler(prev, route.params);
    });
  }

  return (
    <AppScreen scrollable>
      <Header title="Pokemon Detail" onBack={navigation.goBack} />

      <View className="pb-4 items-center border-b -mx-4">
        <View className="h-32 w-32">
          <Image
            className="w-full h-full"
            source={{uri: data?.sprites.front_default}}
          />
        </View>
      </View>

      <View className="flex-row justify-between items-center">
        <Text>{name?.ucwords()}</Text>
        <Spacer />
        <Icon onPress={toggleFavorite} solid={isFavorite} name="heart" />
      </View>

      <RenderSprites sprites={sprites!} />
      <RenderAbilities abilities={abilities} />
    </AppScreen>
  );
}

function RenderAbilities({abilities}: Pick<TPokemonDetail, 'abilities'>) {
  return (
    <>
      <Text>Abilities</Text>
      <Spacer />
      {abilities.mmap(({item: {ability}, isLast}) => {
        return (
          <>
            <Text>{ability.name}</Text>
            {!isLast && <Spacer />}
          </>
        );
      })}
    </>
  );
}

function RenderSprites({sprites}: Pick<TPokemonDetail, 'sprites'>) {
  const data = entries(sprites).filter(([, url]) => typeof url === 'string');

  return (
    <>
      <Text>Sprite Gallery</Text>

      <View>
        <List
          numColumns={2}
          data={data}
          renderItem={({item: [, url]}) => {
            return (
              <View className="w-24 h-24">
                <Image
                  className="w-full h-full"
                  source={{uri: url as string}}
                />
              </View>
            );
          }}
        />
      </View>
    </>
  );
}
