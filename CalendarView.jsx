import React, { useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { ScheduleContext } from './ScheduleContext';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarView = ({ theme }) => {
  const { schedule } = useContext(ScheduleContext);

  const events = schedule.map((lesson) => ({
    title: `${lesson.title} (${lesson.type})`,
    start: new Date(`${lesson.date}T${lesson.time}`),
    end: new Date(`${lesson.date}T${lesson.time}`),
  }));

  return (
    <div className={`calendar-view ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-2xl font-bold mb-4"></h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className={`rbc-calendar ${theme === 'dark' ? 'dark' : ''}`}
      />
    </div>
  );
};

export default CalendarView;
