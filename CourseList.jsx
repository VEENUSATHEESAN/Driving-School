import React from 'react';

const CourseList = ({ courses, onView, onEdit, onDelete, theme }) => {
  const buttonClass = "px-4 py-2 rounded transition-all w-24"; // w-24 ensures all buttons are the same width

  return (
    <div className="mt-10">
      <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Course List</h2>
      <div className={`border rounded-lg overflow-x-auto shadow-md ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className={`${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
              <th className="p-4 border-b">ID</th>
              <th className="p-4 border-b">Title</th>
              <th className="p-4 border-b">Duration</th>
              <th className="p-4 border-b">Syllabus</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id} className={`hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>
                <td className="p-4 border-b">{course._id}</td>
                <td className="p-4 border-b">{course.title}</td>
                <td className="p-4 border-b">{course.duration}</td>
                <td className="p-4 border-b">{course.syllabus}</td>
                <td className="p-4 border-b flex space-x-2">
                  <button 
                    className={`bg-yellow-500 text-white ${buttonClass} hover:bg-yellow-600`} 
                    onClick={() => onView(course)}
                  >
                    View
                  </button>
                  <button 
                    className={`bg-green-500 text-white ${buttonClass} hover:bg-green-600`} 
                    onClick={() => onEdit(course)}
                  >
                    Edit
                  </button>
                  <button 
                    className={`bg-red-500 text-white ${buttonClass} hover:bg-red-600`} 
                    onClick={() => onDelete(course._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseList;
