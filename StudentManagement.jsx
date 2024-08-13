import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import StudentDetails from './StudentDetails';
import { ThemeContext } from './ThemeContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Error fetching students');
    }
  };

  const handleSaveStudent = async (student) => {
    try {
      if (student.id) {
        await axios.put(`http://localhost:5000/api/students/${student.id}`, student);
        toast.success('Student updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/students', student);
        toast.success('Student added successfully!');
      }
      fetchStudents();
      setIsEditing(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error('Error saving student:', error.response ? error.response.data : error.message);
      toast.error('Error saving student');
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setStudents(students.filter(student => student.id !== id));
      setSelectedStudent(null);
      toast.success('Student deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error.response ? error.response.data : error.message);
      toast.error('Error deleting student');
    }
  };

  const handleDeleteStudentWithConfirmation = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this student?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteStudent(id),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setSelectedStudent(null);
    setIsEditing(false);
  };

  const handleCloseDetails = () => {
    setSelectedStudent(null);
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
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      <div className="content">
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              <StudentForm 
                student={selectedStudent} 
                onSave={handleSaveStudent} 
                onCancelEdit={handleCancelEdit} 
                theme={theme} 
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {selectedStudent && !isEditing && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              <StudentDetails 
                student={selectedStudent} 
                onClose={handleCloseDetails} 
                onEdit={() => handleEditStudent(selectedStudent)}
                theme={theme} 
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isEditing && !selectedStudent && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              <StudentList 
                students={students} 
                onSelectStudent={setSelectedStudent} 
                onDeleteStudent={handleDeleteStudentWithConfirmation} 
                theme={theme} 
              />
              <button 
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition" 
                onClick={() => setIsEditing(true)}
              >
                Add Student
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default StudentManagement;
