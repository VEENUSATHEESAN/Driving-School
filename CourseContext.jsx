import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    }
  };

  const handleAddEditCourse = async (course) => {
    try {
      if (course._id) {
        await axios.put(`http://localhost:5000/api/courses/${course._id}`, course);
      } else {
        await axios.post('http://localhost:5000/api/courses', course);
      }
      await fetchCourses();
    } catch (error) {
      console.error('Failed to add/edit course', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
      await fetchCourses();
    } catch (error) {
      console.error('Failed to delete course', error);
    }
  };

  return (
    <CourseContext.Provider value={{ courses, handleAddEditCourse, handleDeleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
