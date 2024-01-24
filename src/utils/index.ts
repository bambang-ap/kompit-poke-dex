import {Alert} from 'react-native';

import toast from 'react-native-simple-toast';

import {TPokemon} from '@appTypes/app.zod';
import {PromptOptions} from '@appTypes/propsType.type';

export function getIdFromLastUrl(url: string) {
  const [id] = url.match(/\d+.$/g)?.map(e => e.replace(/\//g, '')) ?? [];

  return id;
}

export function favoriteToggler(pokemons: TPokemon[], pokemon: TPokemon) {
  const index = pokemons.findIndex(curId => curId.url === pokemon.url);

  const pokeName = pokemon?.name?.ucwords();

  if (index >= 0) {
    toast.show(`Successfully remove ${pokeName} from favorite`, 2500);
    return pokemons.remove(index);
  }

  toast.show(`Successfully add ${pokeName} to favorite`, 2500);
  return [...pokemons, pokemon];
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
