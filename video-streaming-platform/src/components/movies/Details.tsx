import { IconButton } from '@mui/material';
import { FavoriteBorder, Favorite, PlayCircleOutline } from '@mui/icons-material';
import { Movie } from '../../types';
import useFavorite from '../../hooks/useFavorites';
import { IGenre } from '../../types';
import { convertGenre } from '../../utils/convertGenre';
import { AiFillCloseCircle } from "react-icons/ai";

interface MovieDetailsProps {
    movie: Movie;
    similarMovies: Movie[] | null;
    onClose: () => void;
    playMovie: (id: number) => void;
    genres: IGenre[]

}

const MovieDetails = ({ movie, similarMovies, onClose, playMovie, genres }: MovieDetailsProps) => {

    const { isFavorite, addFavorite, removeFavorite } = useFavorite()

    return (
        <div className=" transition-all fixed top-[98px] right-3 w-[290px] h-[calc(100vh-110px)] bg-white dark:bg-[#0E0C0A] shadow-lg flex flex-col overflow-y-auto rounded-lg  duration-300 p-3">
            <button
                onClick={onClose}
                className="mb-1 self-end text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white px-2 pb-1"
            >
               <AiFillCloseCircle size={24} className='text-red-400'/>
            </button>

            <div className="relative group mb-4">
                <img
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : 'https://via.placeholder.com/400x300'
                    }
                    alt={movie.title}
                    className="w-full rounded-md max-h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => {
                        playMovie(movie.id)

                    }}
                >
                    <PlayCircleOutline className="text-white  cursor-pointer bg-gradient-to-r from-[#5F42E2] to-[#9B42C0] w-16 h-16 rounded-full" fontSize='large' />
                </div>
            </div>

            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{movie.title}</h2>
                <IconButton onClick={() => isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie)}>
                    {isFavorite(movie.id) ? <Favorite className='text-red-500' /> : <FavoriteBorder className=' text-gray-500' />}
                </IconButton>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Uploaded by: {movie.uploader || 'Anonymous'}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
                {convertGenre(movie.genre_ids, genres).map((genreName) => (
                    <span
                        key={genreName}
                        className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md"
                    >
                        {genreName}
                    </span>
                ))}
            </div>

            <p className="text-sm text-gray-800 dark:text-gray-200 mb-4">
                {movie.overview || 'No description available.'}
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Similar Movies</h3>
            <div className="grid grid-cols-3 gap-2">
                {similarMovies?.map((similarMovie) => (
                    <div key={similarMovie.id} className="cursor-pointer">
                        <img
                            src={
                                similarMovie.poster_path
                                    ? `https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`
                                    : 'https://via.placeholder.com/120x160'
                            }
                            alt={similarMovie.title}
                            className="w-full h-[120px] object-cover rounded-md shadow-md"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieDetails;
