import {FieldValues, UseFormReturn} from 'react-hook-form';

export type FormProps<
  T extends FieldValues,
  K extends keyof UseFormReturn<T> = 'control',
> = Pick<UseFormReturn<T>, K>;
