import { useQuery } from '@tanstack/react-query';
import { PokemonListItem } from '../types/PokemonListItem';
import { wait } from '../utils/utils';
import { API_ENDPOINT } from '../constants/constants';

const fetchPokemons = async (offset: number, limit: number) => {
  // Fake a delay
  await wait(1);

  // Fetch the data
  const response = await fetch(`${API_ENDPOINT}/pokemon?offset=${offset}&limit=${limit}`);

  // Check response status
  if (!response.ok) throw new Error('Failed to fetch the list of pokemons');

  // Return results
  return response.json();
};

type Results = {
  count: number;
  next: string;
  previous: string;
  results: PokemonListItem[];
};

export const usePokemons = (offset: number, limit: number) => {
  return useQuery<Results>({
    queryKey: ['pokemons', offset, limit],
    queryFn: () => fetchPokemons(offset, limit)
  });
};
