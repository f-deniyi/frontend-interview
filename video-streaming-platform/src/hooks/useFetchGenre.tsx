import { useState, useEffect } from 'react';
import { IGenre } from '../types';


const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const useFetchGenre = () => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
                const data = await response.json();
                setGenres(data.genres || []);
            } catch (err) {
                setError('Failed to fetch genres');
            } finally {
                setIsLoading(false);
            }
        };

        fetchGenres();
    }, []);

    return { genres, isLoading, error };
};

export default useFetchGenre;
