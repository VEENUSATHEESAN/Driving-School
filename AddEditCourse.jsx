import React, { useState, useEffect } from 'react';

const AddEditCourse = ({ onSubmit, onCancel, course, theme }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [syllabus, setSyllabus] = useState('');

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDuration(course.duration);
      setSyllabus(course.syllabus);
    } else {
      setTitle('');
      setDuration('');
      setSyllabus('');
    }
  }, [course]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedCourse = {
      _id: course ? course._id : null,
      title,
      duration,
      syllabus
    };
    onSubmit(updatedCourse);
  };

  return (
    <div className={`mt-10 p-6 shadow-md rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-4">{course ? 'Edit Course' : 'Add Course'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-300'}`}
          />
        </div>
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Duration:</label>
          <input 
            type="text" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
            required 
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-300'}`}
          />
        </div>
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Syllabus:</label>
          <textarea 
            value={syllabus} 
            onChange={(e) => setSyllabus(e.target.value)} 
            required 
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-300'}`}
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition focus:outline-none focus:shadow-outline"
          >
            {course ? 'Update' : 'Add'}
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditCourse;