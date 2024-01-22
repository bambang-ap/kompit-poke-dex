import React from 'react';
import {View, Text} from 'react-native';

import {Icon, Spacer} from '@components';

type Props = {
  title?: string;
  onBack?: NoopVoid;
  leftAccessory?: JSX.Element;
  rightAccessory?: JSX.Element;
};

export default function Header({
  title,
  onBack,
  leftAccessory,
  rightAccessory,
}: Props) {
  return (
    <View className="flex-row items-center p-4 border-b -m-4 -mb-0">
      {onBack && (
        <>
          <Icon onPress={onBack} name="arrow-left" />
          <Spacer />
        </>
      )}

      {leftAccessory && (
        <>
          {leftAccessory}
          <Spacer />
        </>
      )}

      <Text className="flex-1 text-center">{title}</Text>

      {rightAccessory && (
        <>
          {rightAccessory}
          <Spacer />
        </>
      )}
    </View>
  );
}
