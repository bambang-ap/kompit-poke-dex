import {Alert} from 'react-native';

import {TPokemon} from '@appTypes/app.zod';
import {PromptOptions} from '@appTypes/propsType.type';

export function getIdFromLastUrl(url: string) {
  const [id] = url.match(/\d+.$/g)?.map(e => e.replace(/\//g, '')) ?? [];

  return id;
}

export function favoriteToggler(ids: TPokemon[], id: TPokemon) {
  const index = ids.findIndex(curId => curId === id);

  if (index >= 0) return ids.remove(index);

  return [...ids, id];
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
