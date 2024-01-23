import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import axios from 'axios';

import {TPokemon, TPokemonDetail, TPokemonUrlParams} from '@appTypes/app.zod';
import {API_HOST} from '@constants';

export async function baseAPI<Res>(path: string, params?: object) {
  const url = `${API_HOST}${path}`;

  const data = await axios.get<Res>(url, {params});

  return data.data;
}

export function usePokemonList() {
  const query = useInfiniteQuery({
    queryKey: ['Pokemon', 'List'],
    queryFn({pageParam = 0}) {
      return baseAPI<TPagination<TPokemon>>('/pokemon', {
        limit: 25,
        offset: pageParam,
      });
    },
    getNextPageParam(prevPage) {
      const {next} = prevPage ?? {};

      if (!next) return false;

      const nextParams = next?.toQueryParams<TPokemonUrlParams>();

      return nextParams?.offset;
    },
  });

  const dataMapped = query.data?.pages.reduce<TPokemon[]>((prev, current) => {
    return [...prev, ...(current.results ?? [])];
  }, []);

  return {...query, dataMapped};
}

export function usePokemonDetail(id: string) {
  const query = useQuery({
    queryKey: ['Pokemon', 'Detail', id],
    queryFn() {
      return baseAPI<TPokemonDetail>(`/pokemon/${id}`);
    },
  });

  return query;
}
