import {z} from 'zod';

export * from './pokemon';

export type TPokemonUrlParams = z.infer<typeof tPokemonUrlParams>;
export const tPokemonUrlParams = z.literal('offset').or(z.literal('limit'));

export type TPokemon = z.infer<typeof tPokemon>;
export const tPokemon = z.object({
  name: z.string(),
  url: z.string(),
});

export type TPagination = z.infer<typeof tPagination>;
export const tPagination = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: tPokemon.array(),
});
