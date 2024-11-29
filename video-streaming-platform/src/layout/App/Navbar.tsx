import React from 'react';
import ThemeToggleButton from '../../components/context/ThemeProviderButton';
import { MdVideoStable } from 'react-icons/md';
import SearchBar from '../../components/features/Searchbar';

interface NavbarProps {
    onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
    return (
        <nav className="transition-colors fixed top-0 left-0 w-full h-20 bg-white dark:bg-[#0E0C0A] flex items-center px-6 shadow-md z-[99] py-4 justify-between">
                <div>
                    <img src={'/logo.png'} className='h-10 w-10' alt='logo' />
                </div>

                <div className="">
                    <SearchBar onSearch={onSearch} /> {/* Pass onSearch function to SearchBar */}
                </div>

                <div>
                    <ThemeToggleButton />
                </div>

        </nav>
    );
};

export default Navbar;
