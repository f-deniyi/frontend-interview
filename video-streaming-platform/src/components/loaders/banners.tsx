import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

const BannerLoader = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '300px',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: 'background.paper',
            }}
        >
            <Skeleton variant="rectangular" width="100%" height="100%" />

            <Box
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    color: 'text.primary',
                }}
            >
                <Skeleton variant="text" width="40%" height={40} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="60%" height={20} />
            </Box>
        </Box>
    );
};

export default BannerLoader;
