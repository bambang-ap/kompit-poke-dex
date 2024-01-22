import {TPokemon} from './app.zod';

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
  [RootStackList.PokeDetail]: TPokemon;
  [RootStackList.PokeFavorites]: undefined;
};
