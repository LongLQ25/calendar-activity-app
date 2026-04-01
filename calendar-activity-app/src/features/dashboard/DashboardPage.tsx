import React from 'react';
import Counter from './components/Counter';

const DashboardPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Total Activities
        </h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
          12
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Completed
        </h3>
        <p className="text-3xl font-bold text-green-500 mt-2">8</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Pending
        </h3>
        <p className="text-3xl font-bold text-yellow-500 mt-2">4</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Upcoming Deadline
        </h3>
        <p className="text-lg text-gray-900 dark:text-white mt-2">
          Team Meeting - 2 days
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
