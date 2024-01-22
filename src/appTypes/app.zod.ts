import {z} from 'zod';

export type TPokemon = z.infer<typeof tPokemon>;
export const tPokemon = z.number();
