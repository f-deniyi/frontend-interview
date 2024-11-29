import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie } from '../types';



const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;


const useFetchMovies = (query: string = '', page: number = 1) => {
    const [data, setData] = useState<Movie[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const apiUrl = query
                    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
                    : `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`;

                const response = await axios.get(apiUrl);

                if (response.status === 200) {
                    const moviesWithMockData = response.data.results.map((movie: any) => ({
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
                    setError('Failed to fetch movies from TMDb API');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [query, page]);

    return { data, isLoading, error };
};

export default useFetchMovies;
