import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

import {TPokemon} from '@appTypes/app.zod';
import {API_HOST} from '@constants';

export async function baseAPI<Res>(path: string, params?: object) {
  const url = `${API_HOST}${path}`;

  const data = await axios.get<Res>(url, {params});

  return data.data;
}

export function useListPokemon() {
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

      const nextParams = next?.toQueryParams<'offset' | 'limit'>();

      return nextParams?.offset;
    },
  });

  const dataMapped = query.data?.pages.reduce<TPokemon[]>((prev, current) => {
    return [...prev, ...(current.results ?? [])];
  }, []);

  return {...query, dataMapped};
}
