import React from 'react';
import { useLocation } from 'react-router-dom';
import { SearchIcon } from './icons/SearchIcon';
import { NotificationIcon } from './icons/NotificationIcon';
import { UserIcon } from './icons/UserIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const Header: React.FC = () => {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname.replace('/', '');
    if (path === '') return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md h-20 flex items-center justify-between px-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {getTitle()}
      </h1>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <NotificationIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="flex items-center space-x-2">
          <UserIcon className="w-8 h-8 rounded-full" />
          <span className="text-gray-800 dark:text-gray-200">John Doe</span>
          <ChevronDownIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </div>
      </div>
    </header>
  );
};

export default Header;
