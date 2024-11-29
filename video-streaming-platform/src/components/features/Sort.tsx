const SortBar = ({ onSort }: { onSort: (sortKey: string) => void }) => {
    return (
        <select
            onChange={(e) => onSort(e.target.value)}
            className="p-2 border rounded dark:bg-[#121212] dark:text-white"
        >
            <option value="views">Sort by Views</option>
            <option value="likes">Sort by Likes</option>
            <option value="uploadDate">Sort by Upload Date</option>
        </select>
    );
};

export default SortBar;
