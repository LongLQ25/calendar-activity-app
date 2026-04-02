import React, { useState } from 'react';
import { useActivityStore } from './store';
import ActivityList from './components/ActivityList';
import ActivityForm from './components/ActivityForm';
import ActivityDetailsModal from './components/ActivityDetailsModal';

const ActivitiesPage: React.FC = () => {
  const { activities } = useActivityStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Activities
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage your upcoming and completed tasks.
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Activity
        </button>
      </div>
      <ActivityList activities={activities} />
      {isFormOpen && (
        <ActivityDetailsModal
          onClose={() => setIsFormOpen(false)}
          activity={undefined}
        />
      )}
    </div>
  );
};

export default ActivitiesPage;
