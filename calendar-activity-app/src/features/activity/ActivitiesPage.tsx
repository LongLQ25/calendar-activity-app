import React, { useState } from 'react';
import { useActivityStore } from './store';
import ActivityList from './components/ActivityList';
import ActivityForm from './components/ActivityForm';

const ActivitiesPage: React.FC = () => {
  const { activities } = useActivityStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Activities</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Activity
        </button>
      </div>
      <ActivityList activities={activities} />
      {isFormOpen && <ActivityForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default ActivitiesPage;
