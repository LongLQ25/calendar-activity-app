import React from 'react';
import type { Activity } from '../types';

interface ActivityDetailsModalProps {
  activity: Activity;
  onClose: () => void;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({ activity, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">{activity.title}</h2>
        <p className="mb-4">{activity.description}</p>
        <p className="mb-4">Date: {new Date(activity.date).toLocaleDateString()}</p>
        <p className="mb-4">Status: {activity.status}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ActivityDetailsModal;
