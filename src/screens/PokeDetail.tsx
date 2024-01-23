import React from 'react';
import {Image, Text, View} from 'react-native';

import AppScreen from '@appComp/AppScreen';
import Header from '@appComp/Header';
import {TPokemonDetail} from '@appTypes/app.zod';
import {RootStackList} from '@appTypes/navigators.enum';
import {Icon, List, Spacer} from '@components';
import {usePokemonDetail} from '@query';
import {getIdFromLastUrl} from '@utils/index';
import {useStackNavigation} from '@utils/navigators';

export default function PokeDetail() {
  const {navigation, route} = useStackNavigation<RootStackList.PokeDetail>();

  const id = getIdFromLastUrl(route.params.url);

  const {data} = usePokemonDetail(id);

  const {sprites, abilities = [], name} = data ?? {};

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
        <Icon name="heart" />
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
