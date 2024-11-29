import React, { useState } from 'react';
import { IGenre } from '../../types';

interface FilterBarProps {
    onFilter: (genreId: number | null) => void; // null for "All",
    genres: IGenre[]
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilter, genres }) => {
    const [activeGenre, setActiveGenre] = useState<number | null>(null);


    return (
        <div className="flex gap-3 items-center overflow-x-auto py-2">
            <button
                onClick={() => {
                    setActiveGenre(null);
                    onFilter(null);
                }}
                className={`transition-colors px-6 py-1 rounded-full ${activeGenre === null
                    ? 'bg-gradient-to-r from-[#5F42E2] to-[#9B42C0] text-white'
                    : 'bg-white dark:bg-[#0E0C0A] text-gray-800 dark:text-gray-200'
                    }`}
            >
                All
            </button>
            {genres.slice(0, 3).map((genre) => (
                <button
                    key={genre.id}
                    onClick={() => {
                        setActiveGenre(genre.id);
                        onFilter(genre.id);
                    }}
                    className={`transition-colors px-4 py-1 rounded-full ${activeGenre === genre.id
                        ? 'bg-gradient-to-r from-[#5F42E2] to-[#9B42C0] text-white'
                        : 'bg-white dark:bg-[#0E0C0A] text-gray-800 dark:text-gray-200'
                        }`}
                >
                    {genre.name}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
