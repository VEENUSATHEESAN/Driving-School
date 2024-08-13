import React, { useContext } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { VehicleProvider } from './VehicleContext';
import VehicleList from './VehicleList';
import VehicleDetails from './VehicleDetails';
import AddEditVehicle from './AddEditVehicle';
import UserVehicle from './UserVehicle';
import './VehicleManagement.css';
import { ThemeContext } from './ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

const VehicleManagement = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Example functions to demonstrate notifications
  const handleAddVehicle = () => {
    // Add vehicle logic here
    toast.success('Vehicle added successfully!');
    navigate('/vehicle-management/vehicleList'); // Redirect after adding
  };

  const handleUpdateVehicle = () => {
    // Update vehicle logic here
    toast.success('Vehicle updated successfully!');
    navigate('/vehicle-management/vehicleList'); // Redirect after updating
  };

  const handleDeleteVehicle = () => {
    // Delete vehicle logic here
    toast.success('Vehicle deleted successfully!');
    navigate('/vehicle-management/vehicleList'); // Redirect after deleting
  };

  return (
    <VehicleProvider>
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
        <header className="header mt-4">
          <h1 className="text-2xl font-bold mb-4">Vehicle Management</h1>
          <nav className="navbar mt-2">
            <ul className="flex space-x-4">
              <li><Link className="hover:text-blue-700" to="/vehicle-management/vehicleList">Vehicle List</Link></li>
              <li><Link className="hover:text-blue-700" to="/vehicle-management/add">Add Vehicle</Link></li>
              <li><Link className="hover:text-blue-700" to="/vehicle-management/user-vehicles">User Vehicles</Link></li>
            </ul>
          </nav>
        </header>
        <main className="main mt-4">
          <AnimatePresence>
            <Routes>
              <Route 
                path="vehicleList" 
                element={
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                  >
                    <VehicleList theme={theme} />
                  </motion.div>
                } 
              />
              <Route 
                path="vehicle/:id" 
                element={
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                  >
                    <VehicleDetails theme={theme} />
                  </motion.div>
                } 
              />
              <Route 
                path="add" 
                element={
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                  >
                    <AddEditVehicle theme={theme} onAdd={handleAddVehicle} />
                  </motion.div>
                } 
              />
              <Route 
                path="edit/:id" 
                element={
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                  >
                    <AddEditVehicle theme={theme} onUpdate={handleUpdateVehicle} />
                  </motion.div>
                } 
              />
              <Route 
                path="user-vehicles" 
                element={
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                  >
                    <UserVehicle theme={theme} onDelete={handleDeleteVehicle} />
                  </motion.div>
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </VehicleProvider>
  );
};

export default VehicleManagement;
