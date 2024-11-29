import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AppLayout = ({ children, handleSearch }: { children: ReactNode, handleSearch: (query: string) => void }) => {
    return (
        <div className="transition-colors bg-gray-300 dark:bg-[#181818ec] min-h-screen">
            <Navbar onSearch={handleSearch} />
            <div className='flex gap-3 mt-20 '>
                <div className='w-[5%] mt-4'>
                    <Sidebar />

                </div>
                <div className='w-[95%]  '>
                    <main className="">{children}</main>

                </div>

            </div>
        </div>
    );
};

export default AppLayout;
