import React from 'react';
import Counter from './components/Counter';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <Counter />
    </div>
  );
};

export default DashboardPage;
