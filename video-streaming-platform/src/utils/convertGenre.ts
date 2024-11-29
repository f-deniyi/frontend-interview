import { IGenre } from "../types";

/**
 * Maps genre IDs to their respective names.
 * @param ids - Array of genre IDs.
 * @param genres - Array of available genres.
 * @returns An array of genre names.
 */
export const convertGenre = (ids: number[], genres: IGenre[]): string[] => {
    return ids.map((id) => genres.find((genre) => genre.id === id)?.name || 'Unknown');
};
