import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    views: number; 
    likes: number; 
    uploadDate: string; 
    category: string; 
    uploader: string; 
}

const useFetchMovies = (query = 'batman') => {
    const [data, setData] = useState<Movie[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const apiKey = '68d8877d';
                const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
                const response = await axios.get(apiUrl);

                if (response.data.Response === 'True') {
                   
                    const moviesWithMockData = response.data.Search.map((movie: any) => ({
                        ...movie,
                        views: Math.floor(Math.random() * 10000), 
                        likes: Math.floor(Math.random() * 5000), 
                        uploadDate: new Date(
                            Date.now() - Math.floor(Math.random() * 10000000000)
                        ).toISOString(),
                        category: ['Action', 'Drama', 'Comedy', 'Thriller'][
                            Math.floor(Math.random() * 4)
                        ], 
                        uploader: ['User1', 'User2', 'User3', 'User4'][
                            Math.floor(Math.random() * 4)
                        ], 
                    }));
                    setData(moviesWithMockData);
                } else {
                    setError(response.data.Error);
                }
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [query]);

    return { data, isLoading, error };
};

export default useFetchMovies;
