import React, { useEffect, useState } from 'react';

interface Filters {
    [key: string]: string[]; 
    categories: string[];
    uploaders: string[];
}

const FilterBar = ({ onFilter }: { onFilter: (filters: Filters) => void }) => {
    const [filters, setFilters] = useState<Filters>({
        categories: [],
        uploaders: [],
    });

    const handleFilterChange = (filterType: keyof Filters, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: prev[filterType].includes(value)
                ? prev[filterType].filter((v) => v !== value) 
                : [...prev[filterType], value], 
        }));
    };

    useEffect(() => {
        onFilter(filters);
    }, [filters, onFilter]);

    return (
        <div className="flex gap-4">
            <div>
                <label>Categories:</label>
                <div>
                    <input
                        type="checkbox"
                        value="action"
                        onChange={() => handleFilterChange('categories', 'action')}
                    />
                    Action
                </div>
                <div>
                    <input
                        type="checkbox"
                        value="drama"
                        onChange={() => handleFilterChange('categories', 'drama')}
                    />
                    Drama
                </div>
            </div>
            <div>
                <label>Uploaders:</label>
                <div>
                    <input
                        type="checkbox"
                        value="uploader1"
                        onChange={() => handleFilterChange('uploaders', 'uploader1')}
                    />
                    Uploader 1
                </div>
                <div>
                    <input
                        type="checkbox"
                        value="uploader2"
                        onChange={() => handleFilterChange('uploaders', 'uploader2')}
                    />
                    Uploader 2
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
