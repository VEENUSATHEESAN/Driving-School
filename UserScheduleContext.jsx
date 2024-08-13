import React, { createContext, useState } from 'react';

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [schedule, setSchedule] = useState([
    { id: 1, title: 'Lesson 1', date: '2023-05-24', time: '10:00:00', instructor: 'Instructor 1', type: 'user' },
    { id: 2, title: 'Lesson 2', date: '2023-05-25', time: '14:00:00', instructor: 'Instructor 2', type: 'admin' },
  ]);

  const addLesson = (lesson) => {
    setSchedule([...schedule, lesson]);
  };

  const updateLesson = (updatedLesson) => {
    setSchedule(schedule.map((lesson) => (lesson.id === updatedLesson.id ? updatedLesson : lesson)));
  };

  const deleteLesson = (lessonId) => {
    setSchedule(schedule.filter((lesson) => lesson.id !== lessonId));
  };

  return (
    <ScheduleContext.Provider value={{ schedule, addLesson, updateLesson, deleteLesson }}>
      {children}
    </ScheduleContext.Provider>
  );
};
