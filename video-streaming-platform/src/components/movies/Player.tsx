import React from 'react';
import useFetchTrailer from '../../hooks/useFetchTrailer';
import { Modal, CircularProgress } from '@mui/material';

interface PlayerProps {
    movieId: number;
    isOpen: boolean;
    onClose: () => void;
}

const Player: React.FC<PlayerProps> = ({ movieId, isOpen, onClose }) => {
    const { trailerUrl, thumbnailUrl, isLoading, error } = useFetchTrailer(movieId);

    return (
        <Modal open={isOpen} onClose={onClose} className="bg-black bg-opacity-70 backdrop-blur-lg">
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-md overflow-hidden shadow-lg w-[90%] h-[80%]"
                style={{
                    backgroundImage: `url(${thumbnailUrl || 'https://via.placeholder.com/300'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.8 ,
                }}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <CircularProgress />
                    </div>
                ) : trailerUrl ? (
                    <div className="relative w-full h-full">
                        <iframe
                            width="100%"
                            height="100%"
                            src={trailerUrl}
                            title="Movie Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full z-10"
                        ></iframe>
                    </div>
                ) : (
                    <p className="text-white text-center mt-4">{error || 'Trailer not available'}</p>
                )}
            </div>
        </Modal>
    );
};

export default Player;
