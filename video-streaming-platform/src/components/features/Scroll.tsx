import React, { useRef, useEffect } from 'react';

const InfiniteScroll = ({ onLoadMore }: { onLoadMore: () => void }) => {
    const loader = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onLoadMore();
                }
            },
            { threshold: 1.0 }
        );

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [onLoadMore]);

    return <div ref={loader} className="h-4" />;
};

export default InfiniteScroll;
