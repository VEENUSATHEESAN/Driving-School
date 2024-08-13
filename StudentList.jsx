import React, { useState, useEffect } from 'react';

function StudentList({ students, onSelectStudent, onDeleteStudent, theme }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(students);

  useEffect(() => {
    setFilteredStudents(
      students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, students]);

  const buttonClass = "px-4 py-2 rounded transition-all w-24"; // w-24 ensures all buttons are the same width

  return (
    <div className="student-list">
      <h2 className="text-xl font-semibold mb-4">Student List</h2>
      <input
        type="text"
        className={`mb-4 p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded`}
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredStudents.map((student) => (
          <li key={student.id || student._id} className={`mb-2 p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded flex justify-between items-center`}>
            <span className="cursor-pointer" onClick={() => onSelectStudent(student)}>{student.name}</span>
            <div className="flex space-x-2">
              <button className={`bg-yellow-500 text-white ${buttonClass} hover:bg-yellow-600`} onClick={() => onSelectStudent(student)}>View</button>
              <button className={`bg-green-500 text-white ${buttonClass} hover:bg-green-600`} onClick={() => onSelectStudent(student)}>Edit</button>
              <button className={`bg-red-500 text-white ${buttonClass} hover:bg-red-600`} onClick={() => onDeleteStudent(student.id || student._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
