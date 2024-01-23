import ReactNativeRecoilPersist from 'react-native-recoil-persist';
import {atom} from 'recoil';

import {TPokemon} from '@appTypes/app.zod';

export const atomFavorites = atom<TPokemon[]>({
  default: [],
  key: 'atomFavorites',
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
