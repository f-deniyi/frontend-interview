import React, { useState } from 'react';
import AppLayout from '../../layout/App';
import BannerLoader from '../../components/loaders/banners';
import LoadingCard from '../../components/loaders/Card';
import useFetchMovies, { Movie } from '../../hooks/useFetchHooks';
import { Banner, Card } from '../../components/movies';
import FilterBar from '../../components/features/Filter';
import SortBar from '../../components/features/Sort';
import { Box, Button } from '@mui/material';

interface Filters {
    categories: string[];
    uploaders: string[];
}

const HomeLoader = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <BannerLoader />
            <div className="grid grid-cols-4 gap-4">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
            </div>
        </div>
    );
};

const Home = () => {
    const [filters, setFilters] = useState<Filters>({
        categories: [],
        uploaders: [],
    });
    const [sortCriteria, setSortCriteria] = useState<string>('views');
    const [visibleCount, setVisibleCount] = useState(5);
    const [searchQuery, setSearchQuery] = useState<string>('batman');
    const { isLoading, data } = useFetchMovies(searchQuery);


    const filteredData = data?.filter((movie: Movie) => {
        const matchesCategory = filters.categories.length
            ? filters.categories.includes(movie.category)
            : true;
        const matchesUploader = filters.uploaders.length
            ? filters.uploaders.includes(movie.uploader)
            : true;
        return matchesCategory && matchesUploader;
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

    const visibleData = sortedData?.slice(0, visibleCount);

    const handleLoadMore = () => setVisibleCount((prev) => prev + 5);
    const handleSearch = (query: string) => {
        setSearchQuery(query);  
    };


    return (
        <AppLayout handleSearch={handleSearch}>
            {isLoading ? (
                <HomeLoader />
            ) : (
                <Box sx={{ p: 4 }}>
                    <div className="flex flex-col gap-4">
                        <FilterBar
                            onFilter={(newFilters: Filters) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    ...newFilters,
                                }))
                            }
                        />
                        <SortBar onSort={(criteria:string) => setSortCriteria(criteria)} />
                    </div>

                    {visibleData && visibleData.length > 0 && (
                        <Banner movie={visibleData[0]} isLoading={isLoading} />
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {visibleData?.map((movie) => (
                            <div key={movie.imdbID}>
                                <Card movie={movie} isLoading={isLoading} />
                            </div>
                        ))}
                    </div>

                    {visibleCount < (sortedData?.length || 0) && (
                        <div className="flex justify-center mt-6">
                            <Button variant="contained" onClick={handleLoadMore}>
                                Load More
                            </Button>
                        </div>
                    )}
                </Box>
            )}
        </AppLayout>
    );
};

export default Home;
