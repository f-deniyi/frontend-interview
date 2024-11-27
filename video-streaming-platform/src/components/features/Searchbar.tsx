import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');

    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500); 

        return () => clearTimeout(timer);
    }, [searchTerm]); 

    useEffect(() => {
        if (debouncedTerm) {
            onSearch(debouncedTerm); 
        }
    }, [debouncedTerm, onSearch]); 

    return (
        <div className="relative w-[500px] mx-auto bg-white dark:bg-[#181818ec] rounded-full border border-gray-300 dark:border-gray-600 outline-none dark:focus-within:border-gray-300 focus-within:border-gray-600 transition-all ease-in-out">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
                type="text"
                placeholder="What do you want to watch?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[500px] py-2 pl-10 pr-4 bg-transparent border-none text-gray-900 dark:text-gray-100 rounded-full outline-none focus"
            />
        </div>
    );
};

export default SearchBar;
