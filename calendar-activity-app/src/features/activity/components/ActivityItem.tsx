import React, { useState } from 'react';
import type { Activity } from '../types';
import { useActivityStore } from '../store';
import ActivityForm from './ActivityForm';

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const { deleteActivity, toggleActivityStatus } = useActivityStore();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3
          className={`text-xl font-bold ${
            activity.status === 'done' ? 'line-through text-gray-500' : ''
          }`}
        >
          {activity.title}
        </h3>
        <p className="text-gray-600">{activity.description}</p>
        <p className="text-sm text-gray-500">{activity.date}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => toggleActivityStatus(activity.id)}
          className={`px-3 py-1 rounded ${
            activity.status === 'pending'
              ? 'bg-yellow-400 hover:bg-yellow-500'
              : 'bg-green-400 hover:bg-green-500'
          }`}
        >
          {activity.status === 'pending' ? 'Pending' : 'Done'}
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 bg-blue-400 text-white rounded hover:bg-blue-500"
        >
          Edit
        </button>
        <button
          onClick={() => deleteActivity(activity.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      {isEditing && (
        <ActivityForm activity={activity} onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default ActivityItem;
