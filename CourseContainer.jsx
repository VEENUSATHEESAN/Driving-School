// CourseContainer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseManagement from './CourseManagement';
import UserCourses from './UserCourses';

const CourseContainer = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const response = await axios.get('http://localhost:5000/api/courses');
    setCourses(response.data);
  };

  const handleAddEditCourse = async (course) => {
    if (course.id) {
      await axios.put(`http://localhost:5000/api/courses/${course.id}`, course);
    } else {
      await axios.post('http://localhost:5000/api/courses', course);
    }
    fetchCourses();
  };

  const handleDeleteCourse = async (courseId) => {
    await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
    fetchCourses();
  };

  return (
    <div>
      <CourseManagement
        courses={courses}
        onAddEditCourse={handleAddEditCourse}
        onDeleteCourse={handleDeleteCourse}
      />
      <UserCourses courses={courses} />
    </div>
  );
};

export default CourseContainer;
