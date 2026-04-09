import React from 'react';
import { NavLink } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { LuCalendar } from 'react-icons/lu';
import { FiActivity, FiCalendar } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const commonClasses =
    'flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg';
  const activeClasses =
    'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white';
  const inactiveClasses = 'hover:bg-gray-200 dark:hover:bg-gray-700';

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
      <div className="flex items-center justify-center h-20 border-b dark:border-gray-700">
        <FiCalendar className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold ml-2 text-gray-900 dark:text-white">
          Calendar
        </h1>
      </div>
      <nav className="flex-1 px-4 py-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          <RxDashboard className="w-6 h-6 mr-3" />
          Dashboard
        </NavLink>
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `${commonClasses} ${isActive ? activeClasses : inactiveClasses} mt-2`
          }
        >
          <LuCalendar className="w-6 h-6 mr-3" />
          Calendar
        </NavLink>
        <NavLink
          to="/activities"
          className={({ isActive }) =>
            `${commonClasses} ${isActive ? activeClasses : inactiveClasses} mt-2`
          }
        >
          <FiActivity className="w-6 h-6 mr-3" />
          Activities
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
