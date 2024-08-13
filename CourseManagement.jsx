import React, { useState, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CourseList from './CourseList';
import CourseDetails from './CourseDetails';
import AddEditCourse from './AddEditCourse';
import { CourseContext } from './CourseContext';
import { ThemeContext } from './ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const CourseManagement = () => {
  const { courses, handleAddEditCourse, handleDeleteCourse } = useContext(CourseContext);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setIsViewing(true);
    setIsEditing(false);
  };

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setIsEditing(true);
    setIsViewing(false);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setIsEditing(true);
    setIsViewing(false);
  };

  const handleCancel = () => {
    setSelectedCourse(null);
    setIsEditing(false);
    setIsViewing(false);
  };

  const handleAddEditCourseWithNotification = async (course) => {
    await handleAddEditCourse(course);
    toast.success(selectedCourse ? 'Course updated successfully!' : 'Course added successfully!');
    setIsEditing(false);
    setIsViewing(false);
    setSelectedCourse(null);
  };

  const handleDeleteCourseWithNotification = (courseId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this course?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            handleDeleteCourse(courseId);
            toast.success('Course deleted successfully!');
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className={`container mx-auto p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <ToastContainer />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center">
          <motion.img 
            src="/IMAGES/newlogo.png" 
            alt="Online Driving School Logo" 
            className="w-20 h-20 mr-4" 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Wizard Driving School</h1>
        </div>
        <button className="text-xl" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </motion.div>
      <AnimatePresence>
        {(!selectedCourse || (!isEditing && !isViewing)) && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
          >
            <CourseList 
              courses={courses} 
              onView={handleSelectCourse} 
              onEdit={handleEditCourse} 
              onDelete={handleDeleteCourseWithNotification} 
              theme={theme}
              buttonStyle="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            />
            <button 
              onClick={handleAddCourse} 
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Add Course
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isViewing && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
          >
            <CourseDetails course={selectedCourse} onCancel={handleCancel} theme={theme} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
          >
            <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} bg-opacity-50 flex items-center justify-center z-50`}>
              <div className={`relative ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg shadow-lg w-3/4 max-w-lg mx-auto`}>
                <AddEditCourse 
                  course={selectedCourse} 
                  onSubmit={handleAddEditCourseWithNotification} 
                  onCancel={handleCancel} 
                  theme={theme} 
                />
                <button 
                  onClick={handleCancel}>
      
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseManagement;
