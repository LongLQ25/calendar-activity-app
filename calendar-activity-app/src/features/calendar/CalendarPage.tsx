import React from 'react';
import Calendar from './components/Calendar';
import { useActivityStore } from '../activity/store';
import type { Activity } from '../../types';

const CalendarPage: React.FC = () => {
  const { activities } = useActivityStore();

  const events = activities.map((activity: Activity) => ({
    title: activity.title,
    start: new Date(activity.date),
    end: new Date(activity.date),
    allDay: true,
    resource: activity,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Calendar</h1>
      <Calendar events={events} />
    </div>
  );
};

export default CalendarPage;
