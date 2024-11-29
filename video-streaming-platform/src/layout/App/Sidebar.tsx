import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { GoHomeFill } from "react-icons/go";
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className="transition-colors fixed  left-3 w-[5%] h-[calc(100vh-110px)] bg-white dark:bg-[#0E0C0A] p-3  rounded-lg ">
      <ul className="space-y-3 w-full">
        <li className="group flex items-center justify-center space-x-3 cursor-pointer text-white  relative w-full ">
          <NavLink to='/' className='bg-gradient-to-r from-[#5F42E2] to-[#9B42C0] rounded-lg w-12 h-12 flex items-center justify-center relative'>
            <GoHomeFill size={20} />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-5">
              Home
            </span>
          </NavLink>

        </li>
        <li className="group flex items-center justify-center space-x-3 cursor-pointer text-white  relative w-full">
          <NavLink to='/favourite' className='bg-gradient-to-r from-[#b91d2fd7] to-[#fd6161] rounded-lg w-12 h-12 flex items-center justify-center relative'>
            <FaHeart size={16} />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-5">
              Favorites
            </span>
          </NavLink>

        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
