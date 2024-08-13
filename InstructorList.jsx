import React from 'react';

const InstructorList = ({ instructors, onView, onEdit, onDelete, theme, showActions = true }) => {
  const buttonClass = "px-4 py-2 rounded transition-all w-24"; // w-24 ensures all buttons are the same width

  return (
    <div className="mt-10">
      <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Instructor List</h2>
      <div className={`border rounded-lg overflow-x-auto shadow-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className={`${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
              <th className="p-4 border-b">ID</th>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Email</th>
              <th className="p-4 border-b">Availability</th>
              <th className="p-4 border-b">Assigned Lessons</th>
              {showActions && <th className="p-4 border-b">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor) => (
              <tr key={instructor._id} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <td className="p-4 border-b">{instructor._id}</td>
                <td className="p-4 border-b">{instructor.name}</td>
                <td className="p-4 border-b">{instructor.email}</td>
                <td className="p-4 border-b">{instructor.availability}</td>
                <td className="p-4 border-b">{instructor.assignedLessons.join(', ')}</td>
                {showActions && (
                  <td className="p-4 border-b flex space-x-2">
                    <button 
                      onClick={() => onView(instructor)} 
                      className={`bg-yellow-500 text-white ${buttonClass} hover:bg-yellow-600`}
                    >
                      View
                    </button>
                    <button 
                      onClick={() => onEdit(instructor)} 
                      className={`bg-green-500 text-white ${buttonClass} hover:bg-green-600`}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(instructor._id)} 
                      className={`bg-red-500 text-white ${buttonClass} hover:bg-red-600`}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorList;
