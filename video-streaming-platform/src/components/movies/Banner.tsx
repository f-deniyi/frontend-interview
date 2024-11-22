import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import { Movie } from '../../types'; 

interface BannerProps {
  movie: Movie | null;
  isLoading: boolean;
}

const Banner = ({ movie, isLoading }: BannerProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '450px',
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: 'background.paper',
      }}
    >
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      ) : (
        <Box
          sx={{
            backgroundImage: `url(${movie?.Poster || 'https://via.placeholder.com/1200x300'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            backgroundRepeat:'no-repeat'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              color: 'white',
            }}
          >
            <Typography variant="h4">{movie?.Title || 'Loading...'}</Typography>
            <Typography variant="subtitle1">{movie?.Year || 'Loading year...'}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Banner;
