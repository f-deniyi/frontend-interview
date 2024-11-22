import React from 'react';
import { Card, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import { Movie } from '../../types';

interface MovieCardProps {
    movie: Movie;
    isLoading: boolean;
}

const MovieCard = ({ movie, isLoading }: MovieCardProps) => {
    return (
        <Card sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>
            {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={180} />
            ) : (
                <CardMedia
                    className='object-cover'
                    component="img"
                    alt={movie.Title}
                    height="40px"
                    image={movie.Poster || 'https://via.placeholder.com/300x180'}
                />
            )}
            <CardContent>
                {isLoading ? (
                    <>
                        <Skeleton variant="text" width="60%" height={30} />
                        <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
                    </>
                ) : (
                    <>
                        <Typography variant="h6">{movie.Title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {movie.Year}
                        </Typography>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default MovieCard;
