import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from './Login';
import Signup from './Signup';
import { ThemeContext } from './ThemeContext';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { theme, toggleTheme } = useContext(ThemeContext);

  const tabVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div
      className={`min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.button
        className="absolute top-4 right-4 text-xl"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </motion.button>
      <motion.div
        className={`w-full max-w-md p-8 space-y-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-lg`}
        initial="hidden"
        animate="visible"
        variants={formVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-around mb-4">
          <motion.button
            className={`px-4 py-2 rounded-lg ${activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            onClick={() => setActiveTab('login')}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            initial="hidden"
            animate="visible"
            variants={tabVariants}
          >
            Login
          </motion.button>
          <motion.button
            className={`px-4 py-2 rounded-lg ${activeTab === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            onClick={() => setActiveTab('signup')}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            initial="hidden"
            animate="visible"
            variants={tabVariants}
          >
            Sign Up
          </motion.button>
        </div>
        <div className="tab-content">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'login' ? <Login /> : <Signup />}
          </motion.div>
        </div>
        <div className="mt-4 text-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link to="/" className="text-blue-500 dark:text-blue-300 hover:underline">Back to Home</Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AuthPage;
