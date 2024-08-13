import React from 'react';

function StudentDetails({ student, onClose, onEdit, theme }) {
  return (
    <div className={`student-details p-4 border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded`}>
      <h2 className="text-xl font-semibold mb-4">Student Details</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
      <p><strong>Address:</strong> {student.address}</p>
      <div className="mt-4 flex space-x-2">
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          onClick={onClose}
        >
          Close
        </button>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default StudentDetails;
