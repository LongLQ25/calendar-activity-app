import React from 'react';

import DashboardCounter from './components/DashboardCounter';

const DashboardPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCounter title="Total Activities" value="1,254" />
      <DashboardCounter title="Completed" value="876" />
      <DashboardCounter title="Pending" value="378" />
      <DashboardCounter title="Overdue" value="50" />
    </div>
  );
};

export default DashboardPage;
