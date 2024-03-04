export enum RootStackList {
  Pokedex = 'PokeDex',
}

export enum MenuList {
  Chats = 'Chats',
  Status = 'Status',
  Calls = 'Calls',
}

export type RootStackParamList = {
  [RootStackList.Pokedex]: undefined;
};
