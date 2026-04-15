import React, { useState } from 'react';
import { useActivityStore } from './store';
import ActivityList from './components/ActivityList';
import ActivityForm from './components/ActivityForm';
import Modal from '../../components/Modal';

function pad2(value: number) {
  return String(value).padStart(2, '0');
}

function todayLocalISODate() {
  const now = new Date();
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

const ActivitiesPage: React.FC = () => {
  const { activities } = useActivityStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const today = todayLocalISODate();
  const upcoming = activities
    .filter((a) => a.status === 'pending' && a.date >= today)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));
  const overdue = activities
    .filter((a) => a.status === 'pending' && a.date < today)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));
  const review = activities
    .filter((a) => a.status === 'done' || a.status === 'skipped')
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

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

      <div className="space-y-10">
        <section>
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Upcoming
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {upcoming.length} item(s)
            </div>
          </div>
          {upcoming.length ? (
            <ActivityList activities={upcoming} />
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              No upcoming activities.
            </div>
          )}
        </section>

        <section>
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Overdue
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {overdue.length} item(s)
            </div>
          </div>
          {overdue.length ? (
            <ActivityList activities={overdue} />
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Nothing overdue.
            </div>
          )}
        </section>

        <section>
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Review (Done / Skipped)
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {review.length} item(s)
            </div>
          </div>
          {review.length ? (
            <ActivityList activities={review} />
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Nothing to review yet.
            </div>
          )}
        </section>
      </div>
      {isFormOpen && (
        <Modal onClose={() => setIsFormOpen(false)} title="Add Activity">
          <ActivityForm onClose={() => setIsFormOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default ActivitiesPage;
