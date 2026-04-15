import React from 'react';
import Calendar from './components/Calendar';
import { useActivityStore } from '../activity/store';
import type { Activity } from '../../types';
import ActivityList from '../activity/components/ActivityList';

function pad2(value: number) {
  return String(value).padStart(2, '0');
}

function todayLocalISODate() {
  const now = new Date();
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

function isoDateToLocalMidnight(isoDate: string) {
  const [y, m, d] = isoDate.split('-').map((v) => Number(v));
  return new Date(y, (m ?? 1) - 1, d ?? 1, 0, 0, 0, 0);
}

const CalendarPage: React.FC = () => {
  const { activities } = useActivityStore();

  const today = todayLocalISODate();
  const upcoming = activities
    .filter((a) => a.status === 'pending' && a.date >= today)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));
  const overdue = activities
    .filter((a) => a.status === 'pending' && a.date < today)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));

  const events = activities.map((activity: Activity) => ({
    title: activity.title,
    start: isoDateToLocalMidnight(activity.date),
    end: isoDateToLocalMidnight(activity.date),
    allDay: true,
    resource: activity,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Calendar</h1>
      <Calendar events={events} />

      <div className="mt-8 space-y-10">
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
      </div>
    </div>
  );
};

export default CalendarPage;
