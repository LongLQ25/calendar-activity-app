import React, { useState } from 'react';
import type { Activity } from '../types';
import { useActivityStore } from '../store';
// import ActivityForm from './ActivityForm';
import ActivityDetailsModal from './ActivityDetailsModal';

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const { deleteActivity, toggleActivityStatus } = useActivityStore();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3
            className={`text-xl font-bold ${
              activity.status === 'done'
                ? 'line-through text-gray-500 dark:text-gray-400'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {activity.title}
          </h3>
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${
              activity.status === 'pending'
                ? 'bg-yellow-200 text-yellow-800'
                : 'bg-green-200 text-green-800'
            }`}
          >
            {activity.status}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {activity.description}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          {new Date(activity.date).toLocaleDateString()}
        </p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-2">
        <button
          onClick={() => toggleActivityStatus(activity.id)}
          className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {activity.status === 'pending' ? 'Complete' : 'Re-open'}
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Edit
        </button>
        <button
          onClick={() => deleteActivity(activity.id)}
          className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
      {isEditing && (
        <ActivityDetailsModal
          activity={activity}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default ActivityItem;
