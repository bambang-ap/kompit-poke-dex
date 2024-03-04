import React, {useEffect, useMemo, useState} from 'react';
import {
  GestureResponderEvent,
  LayoutRectangle,
  Touchable,
  View,
} from 'react-native';

import {useForm} from 'react-hook-form';

import {Button, Input} from '@components';
import {useButtons} from '@hooks';
import {initWebSocket} from '@utils/index';

export type TControllerForm = MyObject<boolean>;

export default function ControllerScreen() {
  const [layoutChild, setLayoutChild] = useState(
    {} as MyObject<LayoutRectangle>,
  );

  const {control, watch} = useForm<{host: string}>({
    defaultValues: {host: '192.168.4.1'},
  });

  const host = watch('host');

  const socket = useMemo(() => {
    return initWebSocket(host);
  }, [host]);

  const form = useForm<TControllerForm>();
  const buttons = useButtons(form, socket.sendMessage);

  function onTouch(type: keyof Touchable) {
    return function ({nativeEvent}: GestureResponderEvent) {
      const {pageX, pageY} = nativeEvent;

      const [key] =
        entries(layoutChild).find(([, l]) => {
          const {height, width, x: xFrom, y: yFrom} = l;
          const xTo = xFrom + width;
          const yTo = yFrom + height;

          const isFitX = pageX >= xFrom && pageX <= xTo;
          const isFitY = pageY >= yFrom && pageY <= yTo;

          return isFitX && isFitY;
        }) ?? [];

      buttons?.[key!]?.events?.[type]?.(type);
    };
  }

  useEffect(() => socket?.close, [host]);

  return (
    <View
      className="flex-1"
      onTouchEnd={onTouch('onTouchEnd')}
      onTouchMove={onTouch('onTouchMove')}
      onTouchStart={onTouch('onTouchStart')}
      onTouchCancel={onTouch('onTouchCancel')}
      onTouchEndCapture={onTouch('onTouchEndCapture')}>
      <Input control={control} fieldName="host" />
      {entries(buttons).map(([title, props]) => (
        <Button
          {...props}
          key={title}
          title={title}
          control={form.control}
          setLayout={l => setLayoutChild(prev => ({...prev, [title]: l}))}
        />
      ))}
    </View>
  );
}
