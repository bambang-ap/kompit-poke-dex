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
import {Icon} from '@components';
import {TControllerForm} from '@screens/Controller';

export type ButtonProps = {
  disabled?: boolean;
  title: string;
  size: [w: number, h: number];
  layout: [x: number, y: number];
  events?: Partial<Record<keyof Touchable, (type?: keyof Touchable) => void>>;
  icon?: [icon: string, iconActive?: string, iconDisabled?: string];
};

export function Button({
  size,
  title,
  layout,
  icon: icons,
  disabled,
  setLayout,
  control,
}: ButtonProps & {
  setLayout(layout: LayoutRectangle): void;
} & FormProps<TControllerForm>) {
  const active = useWatch({control, name: title});

  const [x, y] = layout;
  const [width, height] = size;

  const [icon, iconActive, iconDisabled] = icons ?? [];

  const selectedIcon = disabled ? iconDisabled : active ? iconActive : icon;

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
      className={classNames('absolute bg-red-500 items-center justify-center', {
        'opacity-80': active,
      })}>
      {!selectedIcon ? (
        <Text>{title}</Text>
      ) : (
        <Icon size={width - 9} name={selectedIcon} />
      )}
    </View>
  );
}
