import React, { useContext, useState } from 'react'; // Import useContext from react
import UserManagement from './UserManagement';
import SystemSettings from './SystemSettings';
import { ThemeContext } from './ThemeContext'; // Ensure correct path
import { motion } from 'framer-motion';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('userManagement');
  const { theme, toggleTheme } = useContext(ThemeContext); // Use ThemeContext

  return (
    <motion.div 
      className={`container mx-auto p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
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
      </div>
      <div className="flex justify-center mb-4">
        <motion.button
          className={`px-4 py-2 mr-2 ${activeTab === 'userManagement' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('userManagement')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          User Management
        </motion.button>
        <motion.button
          className={`px-4 py-2 ${activeTab === 'systemSettings' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('systemSettings')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          System Settings
        </motion.button>
      </div>
      <motion.div 
        className={`p-4 rounded shadow ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === 'userManagement' && <UserManagement theme={theme} />}
        {activeTab === 'systemSettings' && <SystemSettings theme={theme} />}
      </motion.div>
    </motion.div>
  );
};

export default AdminSettings;
