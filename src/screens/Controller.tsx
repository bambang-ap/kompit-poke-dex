import React, {useRef, useState} from 'react';
import {
  GestureResponderEvent,
  LayoutRectangle,
  Touchable,
  View,
  Text,
} from 'react-native';

import {useForm} from 'react-hook-form';
import useWebSocket, {ReadyState} from 'react-native-use-websocket';

import {Button, Input} from '@components';
import {useButtons} from '@hooks';

export type TControllerForm = MyObject<boolean>;

export function useWs(socketUrl: string) {
  const ws = useWebSocket(socketUrl);
  const messageHistory = useRef<any>([]);

  const {lastMessage, readyState} = ws;

  messageHistory.current = React.useMemo(
    () => messageHistory.current.concat(lastMessage),
    [lastMessage],
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return {...ws, connectionStatus};
}

export default function ControllerScreen() {
  const [layoutChild, setLayoutChild] = useState(
    {} as MyObject<LayoutRectangle>,
  );
  const {control, watch} = useForm({defaultValues: {host: '192.168.4.1:81'}});

  const {host} = watch();

  const socket = useWs(`ws://${host}`);

  const form = useForm<TControllerForm>();
  const buttons = useButtons(form, socket.sendJsonMessage);

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

  return (
    <View
      className="flex-1 bg-gray-500"
      onTouchEnd={onTouch('onTouchEnd')}
      onTouchMove={onTouch('onTouchMove')}
      onTouchStart={onTouch('onTouchStart')}
      onTouchCancel={onTouch('onTouchCancel')}
      onTouchEndCapture={onTouch('onTouchEndCapture')}>
      <Input control={control} fieldName="host" />
      <Text>{socket.connectionStatus}</Text>

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
