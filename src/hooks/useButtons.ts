import {UseFormReturn} from 'react-hook-form';

import {FormProps} from '@appTypes/app.zod';
import {ButtonProps} from '@components';
import {TControllerForm} from '@screens/Controller';

type T = TControllerForm;

export function useButtons(
  form: FormProps<T, keyof UseFormReturn<T>>,
  send: (message: any) => void,
) {
  const dataForm = form.watch();

  function toggle(key: string, status?: boolean): boolean {
    const value = status !== undefined ? status : !dataForm[key];
    form.reset(p => ({
      ...p,
      [key]: value,
    }));

    return value;
  }

  const buttons: ButtonProps[] = [
    {
      title: 'W',
      layout: [15, 50],
      size: [75, 75],
      get events(): ButtonProps['events'] {
        return {
          onTouchStart: type => {
            const state = true;
            toggle(this.title, state);
            send({type, key: this.title, state});
          },
          onTouchEnd: type => {
            const state = false;
            toggle(this.title, state);
            send({type, key: this.title, state});
          },
        };
      },
    },
    {
      title: 'S',
      layout: [15, 80],
      size: [75, 75],
      get events(): ButtonProps['events'] {
        return {
          onTouchStart: type => {
            const state = true;
            toggle(this.title, state);
            send({type, key: this.title, state});
          },
          onTouchEnd: type => {
            const state = false;
            toggle(this.title, state);
            send({type, key: this.title, state});
          },
        };
      },
    },
    {
      title: 'A',
      layout: [70, 70],
      size: [75, 75],
      get events(): ButtonProps['events'] {
        return {
          onTouchStart: type => {
            const state = true;
            toggle(this.title, state);
            send({type, key: this.title, state});
          },
          onTouchEnd: type => {
            const state = false;
            toggle(this.title, state);
            send({type, key: this.title, state});
          },
        };
      },
    },
    {
      title: 'D',
      layout: [85, 70],
      size: [75, 75],
      get events(): ButtonProps['events'] {
        return {
          onTouchStart: type => {
            const state = true;
            toggle(this.title, state);
            send({type, key: this.title, state});
          },
          onTouchEnd: type => {
            const state = false;
            toggle(this.title, state);
            send({type, key: this.title, state});
          },
        };
      },
    },
    // {
    //   title: 'Horn',
    //   layout: [30, 85],
    //   size: [75, 75],
    //   get events(): ButtonProps['events'] {
    //     return {
    //       onTouchStart: () => {
    //         const state = true;
    //         toggle(this.title, state);
    //         send({key: this.title, state});
    //       },
    //       onTouchEnd: () => {
    //         const state = false;
    //         toggle(this.title, state);
    //         send({key: this.title, state});
    //       },
    //     };
    //   },
    // },
    {
      title: 'Engine',
      layout: [45, 85],
      size: [75, 75],
      get events(): ButtonProps['events'] {
        return {
          onTouchStart: type => {
            const state = toggle(this.title);
            send({type, key: this.title, state});
          },
        };
      },
    },
  ];

  return buttons.reduce<MyObject<ButtonProps>>((ret, button) => {
    return {...ret, [button.title]: button};
  }, {});
}
