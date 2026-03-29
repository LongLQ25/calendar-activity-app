import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { Activity } from '../../activity/types';
import ActivityDetailsModal from '../../activity/components/ActivityDetailsModal';
import ActivityForm from '../../activity/components/ActivityForm';

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: Activity;
}

interface CalendarProps {
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectEvent = (event: Event) => {
    setSelectedActivity(event.resource as Activity);
    setShowActivityModal(true);
  };

  const handleSelectSlot = (slotInfo: { start: Date }) => {
    setSelectedDate(slotInfo.start);
    setShowAddActivityModal(true);
  };

  const handleCloseModal = () => {
    setShowActivityModal(false);
    setSelectedActivity(null);
  };

  const handleCloseAddActivityModal = () => {
    setShowAddActivityModal(false);
    setSelectedDate(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        className="rbc-calendar"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
      />
      {showActivityModal && selectedActivity && (
        <ActivityDetailsModal
          activity={selectedActivity}
          onClose={handleCloseModal}
        />
      )}
      {showAddActivityModal && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Add Activity for {selectedDate.toLocaleDateString()}</h2>
            <ActivityForm
              onClose={handleCloseAddActivityModal}
              date={selectedDate.toISOString().split('T')[0]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
