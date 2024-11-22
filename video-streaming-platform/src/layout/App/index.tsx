import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AppLayout = ({ children, handleSearch }: { children: ReactNode, handleSearch: (query: string) => void }) => {
    return (
        <div className="bg-white dark:bg-gray-800 min-h-screen">
            <Navbar onSearch={handleSearch} />
            <div className='flex gap-3'>
                <div className='col-span-1 w-[5%]'>
                    <Sidebar />

                </div>
                <div className='col-span-11 w-[95%]'>
                    <main className="mt-20 p-6">{children}</main>

                </div>

            </div>
        </div>
    );
};

export default AppLayout;
