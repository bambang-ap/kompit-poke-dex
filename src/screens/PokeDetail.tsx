import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';

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
  const id = getIdFromLastUrl(url);
  const isFavorite = favorites.findIndex(cur => cur.url === url) >= 0;

  const {data} = usePokemonDetail(id);

  const {sprites, abilities = [], name} = data ?? {};

  function toggleFavorite() {
    setFavorites(prev => {
      return favoriteToggler(prev, route.params);
    });
  }

  return (
    <AppScreen>
      <Header title="Pokemon Detail" onBack={navigation.goBack} />

      <ScrollView className="flex-1">
        <View className="pb-4 items-center border-b border-gray-500 -mx-4">
          <View className="h-64 w-64">
            <Image
              className="w-full h-full"
              source={{uri: data?.sprites.front_default}}
            />
          </View>
        </View>

        <Spacer />

        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold">{name?.ucwords()}</Text>
          <Spacer />
          <Icon onPress={toggleFavorite} solid={isFavorite} name="heart" />
        </View>

        <Spacer />

        <RenderSprites sprites={sprites!} />
        <RenderAbilities abilities={abilities} />
      </ScrollView>
    </AppScreen>
  );
}

function RenderAbilities({abilities}: Pick<TPokemonDetail, 'abilities'>) {
  return (
    <>
      <Text className="text-lg font-bold">Abilities</Text>
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
  const data = entries(sprites)
    .filter(([, url]) => {
      return typeof url === 'string';
    })
    .reverse();

  return (
    <>
      <Text className="text-lg font-bold">Sprite Gallery</Text>

      <Spacer />

      <List
        spacing="p-4"
        numColumns={2}
        data={data}
        renderItem={({item: [, url]}) => {
          return (
            <View className="items-center border border-gray-500 rounded-lg">
              <View className="w-32 h-32">
                <Image
                  className="w-full h-full"
                  source={{uri: url as string}}
                />
              </View>
            </View>
          );
        }}
      />
    </>
  );
}
