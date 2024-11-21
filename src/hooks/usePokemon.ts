import { useQuery } from '@tanstack/react-query';
import { PokemonType } from '../types/PokemonType';
import { PokemonAbility } from '../types/PokemonAbility';
import { wait } from '../utils/utils';
import { API_ENDPOINT } from '../constants/constants';

const fetchPokemon = async (id: string) => {
  // Fake a delay
  await wait(1);

  // Fetch data
  const response = await fetch(`${API_ENDPOINT}/pokemon/${id}`);

  // Check response status
  if (!response.ok) throw new Error('Failed to fetch Pokémon details');

  // Return response
  return await response.json();
};

type Results = {
  name: string;
  types: PokemonType[];
  height: number;
  weight: number;
  abilities: PokemonAbility[];
};

export const usePokemon = (id: string) => {
  return useQuery<Results>({
    queryKey: [`pokemon/${id}`],
    queryFn: () => fetchPokemon(id)
  });
};
