import React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {TPokemon} from '@appTypes/app.zod';
import {RootStackList} from '@appTypes/navigators.enum';
import {List, Spacer} from '@components';
import {getIdFromLastUrl} from '@utils/index';
import {useStackNavigation} from '@utils/navigators';

type Props<T extends TPokemon> = {
  data: T[];
  pagination?: {
    hasNextPage: boolean;
    fetchNextPage: NoopVoid;
    isFetchingNextPage: boolean;
  };
};

export default function PokemonList<T extends TPokemon>({
  data,
  pagination,
}: Props<T>) {
  const {navigation} = useStackNavigation();

  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage = false,
  } = pagination ?? {};

  return (
    <>
      <List
        data={data}
        numColumns={2}
        onEndReachedThreshold={0.2}
        keyExtractor={item => item?.url}
        refreshing={isFetchingNextPage}
        onEndReached={hasNextPage ? fetchNextPage : undefined}
        renderItem={({item}) => {
          const id = getIdFromLastUrl(item.url);
          const uri = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <TouchableOpacity
              key={item.url}
              className="border border-gray-500 rounded-lg overflow-hidden p-4"
              onPress={() =>
                navigation.navigate(RootStackList.PokeDetail, item)
              }>
              <View className="self-center w-32 h-32">
                {!!id && !!uri && (
                  <Image className="w-full h-full" source={{uri}} />
                )}
              </View>
              <Spacer />
              <Text className="text-center text-base">
                {item?.name?.ucwords()}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      {isFetchingNextPage && <ActivityIndicator size="large" />}
    </>
  );
}
