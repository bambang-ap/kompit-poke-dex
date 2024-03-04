import {Alert} from 'react-native';

import {PromptOptions} from '@appTypes/propsType.type';

export function initWebSocket(host: string) {
  const socket = new WebSocket('ws:/' + '/' + host + ':81');

  socket.onopen = function () {
    console.log('[socket] socket.onopen');
  };
  socket.onerror = function () {
    console.error('[socket] socket.onerror');
  };
  socket.onmessage = function (e) {
    console.log('[socket] Incoming message', e.data);
  };

  function sendMessage(payload: any) {
    try {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(payload));
        return Promise.resolve(true);
      }

      return Promise.resolve(false);
    } catch (error) {
      // Handle error
      return Promise.resolve(false);
    }
  }

  return {...socket, sendMessage};
}

export function getIdFromLastUrl(url: string) {
  const [id] = url.match(/\d+.$/g)?.map(e => e.replace(/\//g, '')) ?? [];

  return id;
}

export function prompt(message: string, options?: PromptOptions): void;
export function prompt(
  title: string,
  message: string,
  options?: PromptOptions,
): void;
export function prompt(
  titleOrMessage: string,
  messageOrOptions?: string | PromptOptions,
  promptOptions?: PromptOptions,
) {
  const isHasTitle = typeof messageOrOptions === 'string';
  const options = isHasTitle ? promptOptions : messageOrOptions;

  Alert.prompt(
    isHasTitle ? titleOrMessage : 'Alert',
    isHasTitle ? messageOrOptions : titleOrMessage,
    [
      {text: options?.confirmText ?? 'Yes', onPress: options?.onConfirm},
      {text: options?.cancelText ?? 'No', onPress: options?.onCancel},
    ],
    'default',
  );
}
