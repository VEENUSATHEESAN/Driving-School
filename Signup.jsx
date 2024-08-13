import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import './Signup.css';
import { ThemeContext } from './ThemeContext'; // Ensure correct path
import Loader from './Loader'; // Ensure correct path
import { motion } from 'framer-motion';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && email && password) {
      setLoading(true); // Show the loader
      // Simulate an async signup process
      setTimeout(() => {
        console.log('Signup successful!');
        setLoading(false); // Hide the loader
        navigate('/user-dashboard'); // Redirect to User Dashboard
      }, 2000);
    } else {
      setError('Please enter all required fields');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setError(null);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      {loading && <Loader />} {/* Show the loader when loading */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
        <motion.img 
            src="/IMAGES/newlogo.png" 
            alt="Online Driving School Logo" 
            className="w-20 h-20 mr-4" 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Wizard Driving School</h1>
        </div>
        <header className="mb-4">
          <h2 className="text-xl font-semibold">Sign Up</h2>
        </header>
        <section>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 pr-10"
                  required
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
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="flex justify-between items-center">
              <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                Sign Up
              </button>
              <button type="button" onClick={handleReset} className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300">
                Reset
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Signup;
