import {PropsWithChildren} from 'react';

import {FontAwesome5IconProps} from 'react-native-vector-icons/FontAwesome5';

import {TPokemon} from './app.zod';

export type IconProps = Pick<FontAwesome5IconProps, 'onPress'> & {
  /**
   * find icon name on https://fontawesome.com/v5/search
   */
  name: string;
  solid?: boolean;
  className?: string;
};

export type AppScreenProps = PropsWithChildren<{className?: string}>;

export type NotesProps = TPokemon & {onPress?: NoopVoid};

export type PromptOptions = {
  onConfirm: NoopVoid;
  onCancel?: NoopVoid;
  cancelText?: string;
  confirmText?: string;
};

export type InputProps = {
  placeholder?: string;
  autoFocus?: boolean;
  multiline?: boolean;
};
