import React from 'react';

const CourseDetails = ({ course, onCancel, theme }) => {
  if (!course) {
    return <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>No course details available</div>;
  }

  return (
    <div className={`mt-10 p-6 shadow-md rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-4">Course Details</h2>
      <div className="mb-2">
        <strong>Title:</strong> {course.title}
      </div>
      <div className="mb-2">
        <strong>Duration:</strong> {course.duration}
      </div>
      <div className="mb-4">
        <strong>Syllabus:</strong> {course.syllabus}
      </div>
      <button 
        onClick={onCancel} 
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Close
      </button>
    </div>
  );
}

export default CourseDetails;
