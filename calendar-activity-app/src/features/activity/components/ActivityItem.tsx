import React, { useMemo, useState } from 'react';
import type { Activity } from '../../../types';
import { useActivityStore } from '../store';
import ActivityForm from './ActivityForm';
import Modal from '../../../components/Modal';

function isoDateToLocalMidnight(isoDate: string) {
  const [y, m, d] = isoDate.split('-').map((v) => Number(v));
  return new Date(y, (m ?? 1) - 1, d ?? 1, 0, 0, 0, 0);
}

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const { deleteActivity, setActivityStatus, copyActivityToNextWeek } =
    useActivityStore();
  const [isEditing, setIsEditing] = useState(false);
  const [completionNote, setCompletionNote] = useState(
    activity.completionNote ?? ''
  );

  const statusMeta = useMemo(() => {
    if (activity.status === 'done') {
      return {
        label: 'done',
        pill: 'bg-green-200 text-green-800',
      };
    }
    if (activity.status === 'skipped') {
      return {
        label: 'skipped',
        pill: 'bg-gray-200 text-gray-800',
      };
    }
    return {
      label: 'pending',
      pill: 'bg-yellow-200 text-yellow-800',
    };
  }, [activity.status]);

  const noteDirty = (activity.completionNote ?? '') !== completionNote;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3
            className={`text-xl font-bold ${
              activity.status === 'done' || activity.status === 'skipped'
                ? 'line-through text-gray-500 dark:text-gray-400'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {activity.title}
          </h3>
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${statusMeta.pill}`}
          >
            {statusMeta.label}
          </span>
        </div>
        {!!activity.description && (
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {activity.description}
          </p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          {isoDateToLocalMidnight(activity.date).toLocaleDateString()}
        </p>

        <div className="mt-4">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
            Quick note (for review)
          </label>
          <input
            type="text"
            value={completionNote}
            onChange={(e) => setCompletionNote(e.target.value)}
            placeholder="Optional"
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-2">
        <button
          onClick={() => copyActivityToNextWeek(activity.id)}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Copy next week
        </button>

        {activity.status === 'pending' ? (
          <>
            <button
              onClick={() =>
                setActivityStatus(activity.id, 'done', completionNote.trim())
              }
              className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Done
            </button>
            <button
              onClick={() =>
                setActivityStatus(
                  activity.id,
                  'skipped',
                  completionNote.trim()
                )
              }
              className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Skipped
            </button>
          </>
        ) : (
          <>
            {noteDirty && (
              <button
                onClick={() =>
                  setActivityStatus(
                    activity.id,
                    activity.status,
                    completionNote.trim()
                  )
                }
                className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save note
              </button>
            )}
            <button
              onClick={() => setActivityStatus(activity.id, 'pending')}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Re-open
            </button>
          </>
        )}
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
        <Modal onClose={() => setIsEditing(false)} title="Edit Activity">
          <ActivityForm
            activity={activity}
            onClose={() => setIsEditing(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default ActivityItem;
