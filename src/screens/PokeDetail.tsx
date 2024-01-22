import React from 'react';
import {Text, View} from 'react-native';

import AppScreen from '@appComp/AppScreen';
import Header from '@appComp/Header';
import {Icon, List, Spacer} from '@components';
import {useStackNavigation} from '@utils/navigators';

export default function PokeDetail() {
  const {navigation} = useStackNavigation();

  return (
    <AppScreen scrollable>
      <Header title="Pokemon Detail" onBack={navigation.goBack} />

      <View className="items-center pb-4 border-b -mx-4">
        <View className="h-56 w-56 bg-blue-500" />
      </View>

      <View className="flex-row justify-between items-center">
        <Text>Ditto</Text>
        <Spacer />
        <Icon name="heart" />
      </View>

      <Text>Sprite Gallery</Text>

      <View>
        <List
          numColumns={2}
          data={[1, 2, 3, 4, 5, 4]}
          renderItem={({}) => {
            return <View className="bg-blue-400 p-5" />;
          }}
        />
      </View>

      <Text>Abilities</Text>
      <Text>Iimber</Text>
      <Text>Impostor</Text>
    </AppScreen>
  );
}
