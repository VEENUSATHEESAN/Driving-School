import React from 'react';

const InstructorDetails = ({ instructor, onCancel, theme }) => {
  if (!instructor) {
    return <div className={`text-gray-600 ${theme === 'dark' ? 'text-gray-400' : ''}`}>No instructor details available</div>;
  }

  return (
    <div className={`mt-10 p-6 shadow-md rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-4">Instructor Details</h2>
      <div className="mb-2">
        <strong>Name:</strong> {instructor.name}
      </div>
      <div className="mb-2">
        <strong>Email:</strong> {instructor.email}
      </div>
      <div className="mb-2">
        <strong>Availability:</strong> {instructor.availability}
      </div>
      <div className="mb-4">
        <strong>Assigned Lessons:</strong> {instructor.assignedLessons.join(', ')}
      </div>
      <button 
        onClick={onCancel} 
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Close
      </button>
    </div>
  );
}

export default InstructorDetails;
