import React from 'react';
import {FlatList, Text, View} from 'react-native';

import {useForm} from 'react-hook-form';

import AppScreen from '@appComp/AppScreen';
import Header from '@appComp/Header';
import {Input} from '@components';

export default function PokeDex() {
  const {control} = useForm();

  const col = 4;
  const data = [1, 2, 3, 4, 5, 3, 4];

  const length = col - (data.length % col);

  const list =
    data.length % col === 0
      ? data
      : [...data, ...Array.from({length}).fill(null)];

  return (
    <AppScreen>
      <Header />

      <Input control={control} fieldName="search" />

      <FlatList
        data={list}
        numColumns={col}
        className="-m-1"
        renderItem={({item}) => {
          if (!item) return <View className="flex-1 p-1" />;
          return (
            <View className="flex-1 p-1">
              <View className="border rounded-lg overflow-hidden">
                <View className="p-8 bg-slate-800" />
                <Text>{item?.toString()}</Text>
              </View>
            </View>
          );
        }}
      />
    </AppScreen>
  );
}
