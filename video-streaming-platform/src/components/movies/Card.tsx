import React from 'react';
import { Card,  CardMedia } from '@mui/material';
import { Movie } from '../../types';

interface MovieCardProps {
    movie: Movie | null; 
  
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const displayTitle = movie?.title || 'Title not available';
    const displayPoster = movie?.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/300x180';

    return (
        <Card sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}  className='h-80'>
            <CardMedia
                component="img"
                alt={displayTitle}
                image={displayPoster}
                sx={{ objectFit: 'cover' }}
                className='h-full'
            />
            
        </Card>
    );
};

export default MovieCard;
