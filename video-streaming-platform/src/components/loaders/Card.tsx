import React from 'react';
import { Card, CardContent, CardMedia, Skeleton, Box } from '@mui/material';

const LoadingCard = () => {
    return (
        <Card sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>
            <CardMedia>
                <Skeleton variant="rectangular" height={140} />
            </CardMedia>
            <CardContent>
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="circular" width={40} height={40} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default LoadingCard;
