import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';

import {TPokemon} from '@appTypes/app.zod';
import {RootStackList} from '@appTypes/navigators.enum';
import {List, Spacer} from '@components';
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
          return (
            <TouchableOpacity
              className="border rounded-lg overflow-hidden p-4"
              onPress={() =>
                navigation.navigate(RootStackList.PokeDetail, item)
              }>
              <View className="bg-gray-500 self-center p-5" />
              <Spacer />
              <Text className="text-center">{item?.name?.ucwords()}</Text>
            </TouchableOpacity>
          );
        }}
      />
      {isFetchingNextPage && <ActivityIndicator size="large" />}
    </>
  );
}
