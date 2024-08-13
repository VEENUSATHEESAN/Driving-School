import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { ThemeContext } from './ThemeContext';
import Loader from './Loader';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === 'admin@example.com' && password === 'password') {
      setLoading(true);
      setTimeout(() => {
        console.log('Signup successful!');
        setLoading(false);
        navigate('/admin/dashboard');
      }, 2000);
    } else {
      setError('Invalid email or password');
    }
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setError(null);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {loading && <Loader />}
      <motion.button
        className="absolute top-4 right-4 text-xl"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </motion.button>
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img 
            src="/IMAGES/newlogo.png" 
            alt="Online Driving School Logo" 
            className="w-20 h-20 mr-4" 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h1 className="text-2xl font-bold">Wizard Driving School</h1>
        </motion.div>
        <h2 className="text-xl font-semibold mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 pr-10"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                style={{ background: 'none', border: 'none', outline: 'none', padding: 0 }}
                className="absolute inset-y-0 right-3 pr-3 flex items-center text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 dark:text-red-400 mb-4">{error}</div>}
          <div className="flex space-x-4">
            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Login
            </motion.button>
            <motion.button
              type="button"
              onClick={handleReset}
              className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Reset
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminLogin;
