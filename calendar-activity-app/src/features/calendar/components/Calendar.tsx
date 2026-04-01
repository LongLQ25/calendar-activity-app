import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
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
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 200px)' }}
        className="rbc-calendar"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        views={['month', 'week', 'day']}
        components={{
          toolbar: (toolbar) => {
            return (
              <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                  <button
                    type="button"
                    onClick={() => toolbar.onNavigate('PREV')}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => toolbar.onNavigate('NEXT')}
                  >
                    Next
                  </button>
                  <button
                    type="button"
                    onClick={() => toolbar.onNavigate('TODAY')}
                  >
                    Today
                  </button>
                </span>
                <span className="rbc-toolbar-label">{toolbar.label}</span>
                <span className="rbc-btn-group">
                  {Object.keys(toolbar.views).map((view: string) => (
                    <button
                      key={view}
                      type="button"
                      className={toolbar.view === view ? 'rbc-active' : ''}
                      onClick={() => toolbar.onView(view as View)}
                    >
                      {view.charAt(0).toUpperCase() + view.slice(1)}
                    </button>
                  ))}
                </span>
              </div>
            );
          },
        }}
      />
      {showActivityModal && selectedActivity && (
        <ActivityDetailsModal
          activity={selectedActivity}
          onClose={handleCloseModal}
        />
      )}
      {showAddActivityModal && selectedDate && (
        <ActivityForm
          onClose={handleCloseAddActivityModal}
          date={selectedDate.toISOString().split('T')[0]}
        />
      )}
    </div>
  );
};

export default Calendar;
