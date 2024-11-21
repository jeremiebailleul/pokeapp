/**
 * Wait for a specific amount of time
 * @param timeout in seconds
 * @returns a promise
 */
export const wait = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout * 1000));

/**
 * Extract a pokemon id from its URL
 * @param url The URL to extract the id from
 * @returns the id
 */
export const extractIdFromUrl = (url: string): string => url.split('/').reverse()[1];

/**
 * Get the image URL of a pokemon for its provided id
 * @param id the id of the pokemon
 * @returns the img URL
 */
export const getImgUrl = (id: string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
