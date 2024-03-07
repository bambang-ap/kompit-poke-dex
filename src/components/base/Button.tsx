import React from 'react';
import {
  LayoutRectangle,
  StyleProp,
  Text,
  Touchable,
  View,
  ViewStyle,
} from 'react-native';

import {useWatch} from 'react-hook-form';

import {FormProps} from '@appTypes/app.zod';
import {TControllerForm} from '@screens/Controller';

export type ButtonProps = {
  title: string;
  size: [w: number, h: number];
  layout: [x: number, y: number];
  events?: Partial<Record<keyof Touchable, (type?: keyof Touchable) => void>>;
};

export function Button({
  size,
  title,
  layout,
  setLayout,
  control,
}: ButtonProps & {
  setLayout(layout: LayoutRectangle): void;
} & FormProps<TControllerForm>) {
  const active = useWatch({control, name: title});

  const [x, y] = layout;
  const [width, height] = size;

  const style: StyleProp<ViewStyle> = {
    width,
    height,
    top: `${y}%`,
    left: `${x}%`,
    marginTop: -height / 2,
    marginLeft: -width / 2,
  };

  return (
    <View
      style={style}
      onLayout={e => setLayout(e.nativeEvent.layout)}
      className={classNames('absolute bg-red-400 items-center justify-center', {
        'opacity-80': active,
      })}>
      <Text
        className={classNames('text-xl font-bold', {
          'color-white': active,
          'color-black': !active,
        })}>
        {title}
      </Text>
    </View>
  );
}
