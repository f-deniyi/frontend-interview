import React from 'react';
import ThemeToggleButton from '../../components/context/ThemeProviderButton';
import { MdVideoStable } from 'react-icons/md';
import SearchBar from '../../components/features/Searchbar';

interface NavbarProps {
    onSearch: (query: string) => void; 
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
    return (
        <nav className="fixed top-0 left-0 w-full h-20 bg-gray-200 dark:bg-gray-900 flex items-center px-6 shadow-md z-10 py-4">
            <div>
                <MdVideoStable className="text-lg font-bold dark:text-white" size={30} />
            </div>

            <div className="flex-grow flex justify-center">
                <SearchBar onSearch={onSearch} /> {/* Pass onSearch function to SearchBar */}
            </div>

            <ThemeToggleButton />
        </nav>
    );
};

export default Navbar;
