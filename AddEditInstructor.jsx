import React, { useState, useEffect } from 'react';

const AddEditInstructor = ({ onSubmit, onCancel, instructor, theme }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [availability, setAvailability] = useState('');
  const [assignedLessons, setAssignedLessons] = useState('');

  useEffect(() => {
    if (instructor) {
      setName(instructor.name);
      setEmail(instructor.email);
      setAvailability(instructor.availability);
      setAssignedLessons(instructor.assignedLessons.join(', '));
    } else {
      setName('');
      setEmail('');
      setAvailability('');
      setAssignedLessons('');
    }
  }, [instructor]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedInstructor = {
      name,
      email,
      availability,
      assignedLessons: assignedLessons.split(',').map(lesson => lesson.trim())
    };
    onSubmit(updatedInstructor);
  };

  return (
    <div className={`mt-10 p-6 shadow-md rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-4">{instructor ? 'Edit Instructor' : 'Add Instructor'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-300'}`}
          />
        </div>
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-300'}`}
          />
        </div>
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Availability:</label>
          <input 
            type="text" 
            value={availability} 
            onChange={(e) => setAvailability(e.target.value)} 
            required 
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-300'}`}
          />
        </div>
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Assigned Lessons:</label>
          <input 
            type="text" 
            value={assignedLessons} 
            onChange={(e) => setAssignedLessons(e.target.value)} 
            required 
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-300'}`}
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition focus:outline-none focus:shadow-outline"
          >
            {instructor ? 'Update' : 'Add'}
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditInstructor;
