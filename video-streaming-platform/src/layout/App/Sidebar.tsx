import React from 'react';
import {  FaHeart } from 'react-icons/fa';
import { GoHomeFill } from "react-icons/go";

const Sidebar = () => {
  return (
    <aside className="fixed top-14 left-0 w-[5%] h-[calc(100vh-3.5rem)] bg-gray-100 dark:bg-gray-900 px-6 pt-10">
      <ul className="space-y-8">
        <li className="group flex items-center space-x-3 cursor-pointer dark:text-white text-gray-800 relative">
          <GoHomeFill size={32} />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-5">
            Home
          </span>
        </li>
        <li className="group flex items-center space-x-3 cursor-pointer dark:text-white text-gray-800 relative">
          <FaHeart size={24} />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-5">
            Favorites
          </span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
