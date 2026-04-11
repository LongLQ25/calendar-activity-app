import React from 'react';

import DashboardCounter from './components/DashboardCounter';
import ActivityBarChart from './components/ActivityBarChart';
import { useActivityStore } from '../activity/store';

function pad2(value: number) {
  return String(value).padStart(2, '0');
}

function todayLocalISODate() {
  const now = new Date();
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

const DashboardPage: React.FC = () => {
  const { activities } = useActivityStore();
  const today = todayLocalISODate();

  const total = activities.length;
  const completed = activities.filter((a) => a.status === 'done').length;
  const pending = activities.filter((a) => a.status === 'pending').length;
  const overdue = activities.filter(
    (a) => a.status === 'pending' && a.date < today
  ).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCounter
          title="Total Activities"
          value={total.toLocaleString()}
        />
        <DashboardCounter title="Completed" value={completed.toLocaleString()} />
        <DashboardCounter title="Pending" value={pending.toLocaleString()} />
        <DashboardCounter title="Overdue" value={overdue.toLocaleString()} />
      </div>

      <ActivityBarChart activities={activities} />
    </div>
  );
};

export default DashboardPage;
