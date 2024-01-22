import React from 'react';
import {SafeAreaView, View} from 'react-native';

type Props = {
  children: JSX.Element[];
};

export default function AppScreen({children}: Props) {
  return (
    <SafeAreaView className="flex-1 flex-col">
      <View className="flex-1 p-4">
        {children.mmap(({item, isLast}) => {
          return (
            <>
              {item}
              {!isLast && <View className="p-1" />}
            </>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
