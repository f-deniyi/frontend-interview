import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { Movie } from '../types';

interface FavoriteMovie extends Movie {
    addedDate: string; 
}

const useFavorite = () => {
    const cookieName = 'favoriteMovies';
    const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

    const getFavoritesFromCookies = (): FavoriteMovie[] => {
        const storedFavorites = Cookies.get(cookieName);
        try {
            return storedFavorites ? JSON.parse(storedFavorites) : [];
        } catch (err) {
            console.error('Error parsing favorite movies cookie:', err);
            return [];
        }
    };

    useEffect(() => {
        const storedFavorites = getFavoritesFromCookies();
        setFavorites(storedFavorites);
    }, []);

    const addFavorite = useCallback((movie: Movie) => {
        setFavorites((prevFavorites) => {
            const exists = prevFavorites.some((fav) => fav.id === movie.id);
            if (exists) return prevFavorites; // Prevent duplicates

            const newFavorite: FavoriteMovie = {
                ...movie,
                addedDate: new Date().toISOString(), // Add the current date
            };

            const updatedFavorites = [...prevFavorites, newFavorite];
            Cookies.set(cookieName, JSON.stringify(updatedFavorites), {
                expires: 30,
                path: '/',
                sameSite: 'strict',
            });
            return updatedFavorites;
        });
    }, []);

    const removeFavorite = useCallback((id: number) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.filter((fav) => fav.id !== id);

            Cookies.set(cookieName, JSON.stringify(updatedFavorites), {
                expires: 30,
                path: '/',
                sameSite: 'strict',
            });
            return updatedFavorites;
        });
    }, []);

    const isFavorite = useCallback(
        (id: number) => favorites.some((fav) => fav.id === id),
        [favorites]
    );

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
    };
};

export default useFavorite;
