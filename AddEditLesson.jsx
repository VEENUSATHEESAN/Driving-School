import React, { useState, useContext } from 'react';
import { ScheduleContext } from './ScheduleContext';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

const AddEditLesson = ({ theme, onAdd, onUpdate, onDelete }) => {
  const { addLesson, updateLesson, deleteLesson, schedule } = useContext(ScheduleContext);
  const [lesson, setLesson] = useState({ _id: '', title: '', date: '', time: '', instructor: '', type: 'user' });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateLesson(lesson);
      toast.success('Lesson updated successfully!');
      onUpdate();
      setIsEditing(false);
    } else {
      addLesson(lesson);
      toast.success('Lesson added successfully!');
      onAdd();
    }
    setLesson({ _id: '', title: '', date: '', time: '', instructor: '', type: 'user' });
  };

  const handleEdit = (lesson) => {
    setLesson(lesson);
    setIsEditing(true);
  };

  const handleDelete = (lessonId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this lesson?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteLesson(lessonId);
            toast.success('Lesson deleted successfully!');
            onDelete();
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const handleView = (lesson) => {
    alert(`Title: ${lesson.title}\nDate: ${lesson.date}\nTime: ${lesson.time}\nInstructor: ${lesson.instructor}`);
  };

  const buttonClass = "px-4 py-2 rounded transition-all w-24";

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded shadow-md`}>
      <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Lesson' : 'Add Lesson'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title:</label>
          <input
            type="text"
            value={lesson.title}
            onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
            className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Date:</label>
          <input
            type="date"
            value={lesson.date}
            onChange={(e) => setLesson({ ...lesson, date: e.target.value })}
            className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Time:</label>
          <input
            type="time"
            value={lesson.time}
            onChange={(e) => setLesson({ ...lesson, time: e.target.value })}
            className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Instructor:</label>
          <input
            type="text"
            value={lesson.instructor}
            onChange={(e) => setLesson({ ...lesson, instructor: e.target.value })}
            className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Type:</label>
          <select
            value={lesson.type}
            onChange={(e) => setLesson({ ...lesson, type: e.target.value })}
            className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className={`px-4 py-2 rounded ${isEditing ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'} ${buttonClass}`}>
          {isEditing ? 'Update Lesson' : 'Save Lesson'}
        </button>
      </form>
      <h2 className="text-xl font-bold mt-6 mb-4">Lessons</h2>
      <ul className="space-y-4">
        {schedule.map((lesson) => (
          <li key={lesson._id} className={`flex items-center justify-between p-4 rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
            <span>{lesson.title} ({lesson.type})</span>
            <div className="space-x-2">
              <button onClick={() => handleView(lesson)} className={`bg-yellow-500 text-white ${buttonClass} hover:bg-yellow-600`}>View</button>
              <button onClick={() => handleEdit(lesson)} className={`bg-green-500 text-white ${buttonClass} hover:bg-green-600`}>Edit</button>
              <button onClick={() => handleDelete(lesson._id)} className={`bg-red-500 text-white ${buttonClass} hover:bg-red-600`}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddEditLesson;
