import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeContext'; // Ensure correct path
import InstructorList from './InstructorList';
import InstructorDetails from './InstructorDetails';
import AddEditInstructor from './AddEditInstructor';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function InstructorManagement() {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false); // Add a state for viewing
  const [instructors, setInstructors] = useState([]);
  const { theme, toggleTheme } = useContext(ThemeContext); // Use ThemeContext

  useEffect(() => {
    fetch('http://localhost:5000/api/instructors')
      .then(response => response.json())
      .then(data => setInstructors(data))
      .catch(error => console.error('Error fetching instructors:', error));
  }, []);

  const handleSelectInstructor = (instructor) => {
    setSelectedInstructor(instructor);
    setIsEditing(false);
    setIsViewing(true); // Set viewing to true when "View" is clicked
  };

  const handleEditInstructor = (instructor) => {
    setSelectedInstructor(instructor);
    setIsEditing(true);
    setIsViewing(false); // Close viewing when editing
  };

  const handleDeleteInstructor = async (instructorId) => {
    try {
      await fetch(`http://localhost:5000/api/instructors/${instructorId}`, { method: 'DELETE' });
      setInstructors(instructors.filter(inst => inst._id !== instructorId));
      setSelectedInstructor(null);
      toast.success('Instructor deleted successfully!');
    } catch (error) {
      console.error('Error deleting instructor:', error.message);
      toast.error('Error deleting instructor!');
    }
  };

  const handleDeleteInstructorWithConfirmation = (instructorId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this instructor?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteInstructor(instructorId),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const handleAddInstructor = () => {
    setSelectedInstructor(null);
    setIsEditing(true);
    setIsViewing(false); // Close viewing when adding new instructor
  };

  const handleAddEditInstructor = async (instructor) => {
    const method = selectedInstructor ? 'PUT' : 'POST';
    const url = selectedInstructor ? `http://localhost:5000/api/instructors/${selectedInstructor._id}` : 'http://localhost:5000/api/instructors';
    
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(instructor),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedInstructor = await response.json();
      
      if (selectedInstructor) {
        setInstructors(instructors.map((inst) =>
          inst._id === selectedInstructor._id ? updatedInstructor : inst
        ));
        toast.success('Instructor updated successfully!');
      } else {
        setInstructors([...instructors, updatedInstructor]);
        toast.success('Instructor added successfully!');
      }

      setSelectedInstructor(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding/editing instructor:', error);
      toast.error('Error adding/editing instructor!');
    }
  };

  const handleCancel = () => {
    setSelectedInstructor(null);
    setIsEditing(false);
    setIsViewing(false); // Close the modal when canceling
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
        {!isEditing && !isViewing && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
          >
            <button 
              onClick={handleAddInstructor} 
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Add Instructor
            </button>
            <InstructorList 
              instructors={instructors} 
              onView={handleSelectInstructor} 
              onEdit={handleEditInstructor} 
              onDelete={handleDeleteInstructorWithConfirmation} 
              theme={theme}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedInstructor && isViewing && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
          >
            <InstructorDetails 
              instructor={selectedInstructor} 
              onCancel={handleCancel} // Pass the cancel handler
              theme={theme} 
            />
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
            <AddEditInstructor 
              instructor={selectedInstructor} 
              onSubmit={handleAddEditInstructor} 
              onCancel={handleCancel} 
              theme={theme} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
