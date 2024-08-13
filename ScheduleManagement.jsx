import React, { useContext } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import CalendarView from './CalendarView';
import AddEditLesson from './AddEditLesson';
import { ScheduleProvider } from './ScheduleContext';
import { ThemeContext } from './ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ScheduleManagement = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Notification functions
  const notifyAdd = () => toast.success('Lesson added successfully!');
  const notifyUpdate = () => toast.success('Lesson updated successfully!');
  const notifyDelete = () => toast.success('Lesson deleted successfully!');

  // Example functions to demonstrate notifications
  const handleAddLesson = () => {
    notifyAdd();
    navigate('/calendar-view');
  };

  const handleUpdateLesson = () => {
    notifyUpdate();
    navigate('/calendar-view');
  };

  const handleDeleteLesson = (lessonId) => {
    notifyDelete();
    navigate('/calendar-view');
  };

  const handleDeleteLessonWithConfirmation = (lessonId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this lesson?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteLesson(lessonId),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <ScheduleProvider>
      <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <ToastContainer />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6"
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
            <h1 className="text-3xl font-bold">Wizard Driving School</h1>
          </div>
          <button className="text-xl" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </motion.div>
        <header className="mb-8">
          <h1 className="text-2xl font-semibold mb-4">Schedule Management</h1>
          <nav className="flex space-x-4">
            <Link to="calendar-view" className="text-blue-500 ">Calendar View</Link>
            <Link to="add-edit-lesson" className="text-blue-500 ">Add/Edit Lesson</Link>
          </nav>
        </header>
        <main>
          <AnimatePresence>
            <Routes>
              <Route 
                path="calendar-view" 
                element={
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                  >
                    <CalendarView theme={theme} />
                  </motion.div>
                } 
              />
              <Route 
                path="add-edit-lesson" 
                element={
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                  >
                    <AddEditLesson 
                      theme={theme} 
                      onAdd={handleAddLesson}
                      onUpdate={handleUpdateLesson}
                      onDelete={handleDeleteLessonWithConfirmation}
                    />
                  </motion.div>
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </ScheduleProvider>
  );
};

export default ScheduleManagement;
