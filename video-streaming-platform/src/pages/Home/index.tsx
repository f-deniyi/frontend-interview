import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import AppLayout from '../../layout/App';
import useFetchMovies from '../../hooks/useFetchHooks';
import { Banner, Card, Details, Player } from '../../components/movies';
import FilterBar from '../../components/features/Filter';
import SortBar from '../../components/features/Sort';
import { Movie } from '../../types';
import { HomeLoader } from '../../components/loaders/HomeLoader';
import useFetchGenre from '../../hooks/useFetchGenre';

const Home = () => {
    const [filters, setFilters] = useState<number | null>(null);
    const [sortCriteria, setSortCriteria] = useState<string>('views');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [page, setPage] = useState(1);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [movieId, setMovieId] = useState<number>(NaN)


    const togglePlayer = () => {
        setShowPlayer(!showPlayer)
    }

    const [movies, setMovies] = useState<Movie[]>([]);

    const { isLoading, data, error } = useFetchMovies(searchQuery, page);
    const { genres, isLoading: fetchingGenre } = useFetchGenre()

    const filteredData = data?.filter((movie: Movie) => {
        if (!filters) return true; 
        return movie.genre_ids.includes(filters);
    });

    const sortedData = filteredData?.sort((a, b) => {
        if (sortCriteria === 'views') {
            return b.views - a.views;
        } else if (sortCriteria === 'likes') {
            return b.likes - a.likes;
        } else if (sortCriteria === 'uploadDate') {
            return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        }
        return 0;
    });

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseDetails = () => {
        setSelectedMovie(null);
    };

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        setPage(1); 
        setMovies([])

    }, []);

    useEffect(() => {
        setMovies([])
    }, [searchQuery])



    const handleScroll = useCallback(() => {

        if (
            window.innerHeight + window.scrollY >= document.body.scrollHeight - 20 &&
            !isLoading // Prevent multiple fetches while loading
        ) {

            setPage(prevPage => prevPage + 1);
        }
    }, [isLoading]); 


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (data) {
            setMovies((prevMovies) => [...prevMovies, ...data]);
        }
    }, [data]);


    const playMovie = (id: number) => {
        setMovieId(id)
        togglePlayer()
    }
    return (
        <AppLayout handleSearch={handleSearch}>
            <Box sx={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
                <Box
                    sx={{
                        flex: selectedMovie ? 2 : 1,
                        transition: 'flex 0.3s ease',
                        p: 2,
                        overflow: 'hidden',
                    }}
                >
                    {(isLoading || fetchingGenre) && !movies.length ? (
                        <HomeLoader />
                    ) : error ? (
                        <Typography variant="h6" color="error" align="center">
                            {error}
                        </Typography>
                    ) : (
                        <Box>


                            {sortedData && sortedData.length > 0 ? (
                                <div className="rounded-lg w-full">
                                    <Banner
                                        movie={movies[0]}
                                        playMovie={playMovie}
                                    />

                                    <div className="flex justify-between gap-4 my-3 sticky top-[100px] z-50 backdrop-blur-md bg-white/30 dark:bg-black/30 shadow-lg border border-gray-300 dark:border-gray-700 rounded-lg p-4 mx-auto max-full text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                        <FilterBar onFilter={(genreId) => setFilters(genreId)} genres={genres} />
                                        <SortBar onSort={(criteria: string) => setSortCriteria(criteria)} />
                                    </div>
                                    <div
                                        className={`grid transition-all ease-in-out gap-4 mt-4 ${selectedMovie
                                            ? 'lg:grid-cols-4'
                                            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
                                            }`}
                                    >
                                        {movies.map((movie, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleMovieClick(movie)}
                                                className="cursor-pointer"
                                            >
                                                <Card
                                                    movie={movie}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                                    No movies found matching the filters.
                                </Typography>
                            )}
                        </Box>
                    )}

                   
                </Box>

                {selectedMovie && (
                    <Box
                        sx={{
                            flex: 1,
                            maxWidth: '290px',
                            minWidth: '300px',
                            transition: 'transform 0.3s ease',
                            p: 2,
                        }}
                    >
                        <Details
                            movie={selectedMovie}
                            playMovie={playMovie}
                            similarMovies={
                                data ? data.filter((m) => m.category === selectedMovie.category) : []
                            }
                            onClose={handleCloseDetails}
                            genres={genres}
                        />
                    </Box>
                )}
            </Box>
            {showPlayer &&
                <Player
                    movieId={movieId}
                    isOpen={showPlayer}
                    onClose={togglePlayer}
                />
            }
        </AppLayout>
    );
};

export default Home;
