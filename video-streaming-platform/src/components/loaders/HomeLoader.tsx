import React from 'react'
import BannerLoader from './banners';
import LoadingCard from './Card';

export const HomeLoader = () => (
    <div className="flex flex-col gap-y-4">
        <BannerLoader />
        <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <LoadingCard key={index} />
            ))}
        </div>
    </div>
);