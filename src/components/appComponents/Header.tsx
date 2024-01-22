import React from 'react';
import {View, Text} from 'react-native';

import {Icon} from '@components';

export default function Header() {
  return (
    <View className="flex-row items-center p-4 border-b -m-4 -mb-0">
      <Icon name="arrow-left" />
      <Text className="flex-1 text-center">Title</Text>
      <Icon name="heart" />
    </View>
  );
}
