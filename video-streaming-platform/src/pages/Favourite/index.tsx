import React, { useState } from 'react';
import AppLayout from '../../layout/App';
import useFavorite from '../../hooks/useFavorites';
import useFetchGenre from '../../hooks/useFetchGenre';
import { convertGenre } from '../../utils/convertGenre';
import { PlayCircleOutline } from '@mui/icons-material';
import { IoTrashBin } from "react-icons/io5";
import { Player } from '../../components/movies';

const Favorite = () => {
    const { favorites, removeFavorite } = useFavorite();

    const handleSearch = (e: string) => {
        console.log(e);
    };

    const { genres } = useFetchGenre();
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [movieId, setMovieId] = useState<number>(NaN)

    const togglePlayer = () => {
        setShowPlayer(!showPlayer)
    }


    const playMovie = (id: number) => {
        setMovieId(id)
        togglePlayer()
    }

    return (
        <>
            <AppLayout handleSearch={handleSearch}>
                <div className="p-4">
                    <div className="relative w-full h-80 bg-gradient-to-br from-[#5038A0] to-[#51399e] rounded-lg p-3">
                        <div className="flex gap-3 items-center">
                            <img src={'/liked.png'} className="w-64 h-full rounded-lg" alt="liked" />
                            <div className="absolute inset-0 bg-gradient-radial from-black/30 via-transparent to-transparent"></div>
                            <div className="relative z-10 h-full flex flex-col justify-end p-6">
                                <p className="text-lg text-gray-300">Playlist</p>
                                <h1 className="text-7xl font-black text-white my-2">Favorite Movies</h1>
                                <p className="text-lg text-gray-300">{`${favorites.length} movies`}</p>
                            </div>
                        </div>
                    </div>

                    {favorites.length > 0 ? (
                        <div>
                            <div className="bg-[rgb(80,56,160)] w-full bottom-0 relative h-[230px] -mt-8 pt-8 pb-3 px-2">
                                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.32)] to-[#12121296]">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-50"
                                        style={{
                                            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="300"><filter id="a" x="0" y="0"><feTurbulence baseFrequency=".75" stitchTiles="stitch" type="fractalNoise" /><feColorMatrix type="saturate" values="0" /></filter><path d="M0 0h300v300H0z" filter="url(#a)" opacity=".05" /></svg>')`,
                                        }}
                                    ></div>
                                </div>
                                <div className="overflow-x-auto z-10 absolute w-full left-0 px-3">
                                    <table className="min-w-full border border-gray-300 rounded-lg bg-white dark:bg-gray-800 shadow-md">
                                        {/* Table Head */}
                                        <thead className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white dark:text-gray-200 backdrop-blur-md">
                                            <tr>
                                                <th className="py-3 px-6 text-left font-semibold"># </th>
                                                <th className="py-3 px-6 text-left font-semibold">Movie</th>
                                                <th className="py-3 px-6 text-left font-semibold">Genre</th>
                                                <th className="py-3 px-6 text-left font-semibold">Date Added</th>
                                                <th className="py-3 px-6  font-semibold text-center">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {favorites.map((movie, index) => (
                                                <tr
                                                    key={movie.id}
                                                    className={`group hover:bg-gray-100 dark:hover:bg-gray-700 ${index % 2 === 0
                                                        ? 'bg-gray-50 dark:bg-gray-800'
                                                        : 'bg-white dark:bg-gray-900'
                                                        }`}
                                                >
                                                    <td className="py-3 px-6 ">
                                                        <div className="relative" onClick={() => {
                                                            playMovie(movie.id)
                                                        }}>
                                                            <span className="dark:text-gray-200 block group-hover:hidden">
                                                                {index + 1}
                                                            </span>
                                                            <span
                                                                className="hidden group-hover:inline-block text-indigo-500"
                                                                title="Play"
                                                            >
                                                                <PlayCircleOutline className="text-white  cursor-pointer bg-gradient-to-r from-[#5F42E2] to-[#9B42C0] w-16 h-16 rounded-full" fontSize='large' />

                                                            </span>
                                                        </div>

                                                    </td>
                                                    <td className="py-3 px-6 flex items-center gap-3">

                                                        <div className="rounded-md overflow-hidden">
                                                            <img
                                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                                alt="poster_img"
                                                                className="object-cover w-16 h-16"
                                                            />
                                                        </div>
                                                        <p className="dark:text-gray-200">{movie.title}</p>
                                                    </td>
                                                    <td className="py-3 px-6 dark:text-gray-200">
                                                        {convertGenre(movie.genre_ids, genres).join(', ')}
                                                    </td>
                                                    <td className="py-3 px-6 dark:text-gray-200">
                                                        {new Date(movie.addedDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="py-3 px-6  text-center cursor-pointer">
                                                        <IoTrashBin className='text-red-600 w-full ' size={24} onClick={() => {
                                                            removeFavorite(movie.id)
                                                        }} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <img
                                src={'/empty.png'}
                                className="h-96 w-96 object-cover"
                                alt="empty"
                            />
                        </div>
                    )}
                </div>

                {showPlayer &&
                    <Player
                        movieId={movieId}
                        isOpen={showPlayer}
                        onClose={togglePlayer}
                    />
                }
            </AppLayout>
        </>
    );
};

export default Favorite;
