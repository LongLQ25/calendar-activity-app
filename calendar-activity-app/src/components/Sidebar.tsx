import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Calendar App</h1>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block p-4 text-lg ${isActive ? 'bg-gray-200' : ''}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `block p-4 text-lg ${isActive ? 'bg-gray-200' : ''}`
              }
            >
              Calendar
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/activities"
              className={({ isActive }) =>
                `block p-4 text-lg ${isActive ? 'bg-gray-200' : ''}`
              }
            >
              Activities
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
