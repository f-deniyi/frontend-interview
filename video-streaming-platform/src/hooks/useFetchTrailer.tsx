import { useState, useEffect } from 'react';

interface TrailerData {
    key: string;
    site: string;
    name: string;
    size: number;
    id: string;
}

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const useFetchTrailer = (movieId: number | null) => {
    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrailer = async () => {
            setIsLoading(true);
            setError(null);

            try {

                const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
                const data = await response.json();

                // Find the first trailer from the results
                const trailer = data.results.find((video: TrailerData) => video.site === 'YouTube');
                console.log('------->>>>>', trailer)
                if (trailer) {
                    const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
                    setTrailerUrl(trailerUrl);
                    setThumbnailUrl(`https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`);
                } else {
                    setError('Trailer not found.');
                }
            } catch (err) {
                setError('Failed to fetch trailer.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrailer();
    }, [movieId]);

    return { trailerUrl, thumbnailUrl, isLoading, error };
};

export default useFetchTrailer;
