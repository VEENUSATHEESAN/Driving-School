import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/schedule');
      setSchedule(response.data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  const addLesson = async (lesson) => {
    try {
      const response = await axios.post('http://localhost:5000/api/schedule', lesson);
      setSchedule(prevSchedule => [...prevSchedule, response.data]);
    } catch (error) {
      console.error('Error adding lesson:', error);
    }
  };

  const updateLesson = async (updatedLesson) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/schedule/${updatedLesson._id}`, updatedLesson);
      setSchedule(prevSchedule => prevSchedule.map((lesson) => (lesson._id === updatedLesson._id ? response.data : lesson)));
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  const deleteLesson = async (lessonId) => {
    try {
      await axios.delete(`http://localhost:5000/api/schedule/${lessonId}`);
      setSchedule(prevSchedule => prevSchedule.filter((lesson) => lesson._id !== lessonId));
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  return (
    <ScheduleContext.Provider value={{ schedule, addLesson, updateLesson, deleteLesson }}>
      {children}
    </ScheduleContext.Provider>
  );
};
