import React from 'react';

interface DashboardCounterProps {
  title: string;
  value: string;
}

const DashboardCounter: React.FC<DashboardCounterProps> = ({ title, value }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
        {value}
      </p>
    </div>
  );
};

export default DashboardCounter;
