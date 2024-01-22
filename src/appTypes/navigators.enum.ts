import {TNotes} from './app.zod';

export enum RootStackList {
  Pokedex = 'PokeDex',
  PokeDetail = 'PokeDetail',
  PokeFavorites = 'PokeFavorites',
}

export enum MenuList {
  Chats = 'Chats',
  Status = 'Status',
  Calls = 'Calls',
}

export type RootStackParamList = {
  [RootStackList.Pokedex]: undefined;
  [RootStackList.PokeDetail]: undefined;
  [RootStackList.PokeFavorites]: undefined | TNotes;
};
