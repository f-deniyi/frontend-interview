import React, { useState } from 'react';
import Player from './Player';
interface BannerProps {
  playMovie: (id: number) => void;
  movie: {
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    id: number;
  } | null;
}

const Banner: React.FC<BannerProps> = ({ movie, playMovie }) => {


  if (!movie) return null;

  return (
    <div
      className="relative h-[500px] text-white rounded-md overflow-hidden"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 px-8 max-w-4xl pb-16  h-full">
        <div className='h-full absolute top-0  flex flex-col justify-end pb-16 '>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
          <p className="text-sm md:text-lg text-gray-300 mb-6">{movie.overview}</p>
          <div>
            <button className="px-6 py-3 bg-red-600 rounded hover:bg-red-700 transition" onClick={() => {
              playMovie(movie.id)
            }}>
              Watch Now
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Banner;
