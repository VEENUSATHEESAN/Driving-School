import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Webcam from 'react-webcam';
import Loader from './Loader';
import { ThemeContext } from './ThemeContext';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    userImage: null,
    email: '',
    phoneNo: '',
    password: '',
    gender: '',
    bio: ''
  });
  const [showWebcam, setShowWebcam] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const webcamRef = useRef(null);

  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'userImage') {
      setFormData({ ...formData, userImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'capturedImage.jpg', { type: 'image/jpeg' });
        setFormData({ ...formData, userImage: file });
      });
    setShowWebcam(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('User Registered:', response.data);

      // Save userId to local storage
      const userId = response.data._id;
      localStorage.setItem('userId', userId);

      toast.success('User successfully registered!');
      setTimeout(() => {
        navigate('/authpage');
      }, 2000); // Wait for 2 seconds to show the toast message before navigating
    } catch (error) {
      console.error('There was an error registering the user!', error);
      console.error('Error details:', error.response ? error.response.data : error.message);
      toast.error('There was an error registering the user!');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      className={`register-container bg-gray-100 dark:bg-gray-900 dark:text-white min-h-screen`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {isLoading && <Loader />}
      <ToastContainer />
      <div className="p-8 rounded-lg w-full max-w-md">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
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
        <motion.button
          className="absolute top-4 right-4 text-xl"
          onClick={toggleTheme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </motion.button>
      </div>
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-6">Register Here</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <label htmlFor="username" className="block text-gray-700 dark:text-gray-300">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white" />
          </motion.div>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <label htmlFor="firstname" className="block text-gray-700 dark:text-gray-300">First Name:</label>
            <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white" />
          </motion.div>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <label htmlFor="lastname" className="block text-gray-700 dark:text-gray-300">Last Name:</label>
            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white" />
          </motion.div>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <label htmlFor="gender" className="block text-gray-700 dark:text-gray-300">Gender:</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </motion.div>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <label htmlFor="bio" className="block text-gray-700 dark:text-gray-300">Bio:</label>
            <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} required className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"></textarea>
          </motion.div>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white" />
          </motion.div>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <label htmlFor="phoneNo" className="block text-gray-700 dark:text-gray-300">Phone No:</label>
            <input type="tel" id="phoneNo" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white" />
          </motion.div>
          <motion.div
            className="form-group relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password:</label>
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} required className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white pr-10" />
            <button type="button" onClick={toggleShowPassword} className="absolute right-3 top-9 text-gray-700 dark:text-gray-300">
              {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </button>
          </motion.div>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2.4 }}
          >
            <label className="block text-gray-700 dark:text-gray-300">Profile Image:</label>
            <div className="flex items-center space-x-4">
              <input type="file" id="userImage" name="userImage" onChange={handleChange} className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white" />
              <button type="button" onClick={() => setShowWebcam(!showWebcam)} className="p-3 border rounded bg-blue-500 text-white">
                {showWebcam ? 'Close Camera' : 'Open Camera'}
              </button>
            </div>
            {showWebcam && (
              <div className="mt-4">
                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full h-64 border rounded" />
                <button type="button" onClick={handleCapture} className="mt-4 p-3 border rounded bg-blue-500 text-white">
                  Capture
                </button>
              </div>
            )}
          </motion.div>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2.6 }}
          >
            <button type="submit" className="w-full p-3 border rounded bg-green-500 text-white">Register</button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Register;
