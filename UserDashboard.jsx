import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { FaCalendarAlt, FaHome, FaChalkboardTeacher, FaCar, FaTags, FaBook, FaTools, FaClipboardList, FaQuestion } from "react-icons/fa";
import { AiFillOpenAI } from "react-icons/ai";
import { motion } from 'framer-motion';
import UserProfile from './UserProfile';
import UserSchedule from './UserSchedule';
import UserInstructors from './UserInstructors';
import UserVehicle from './UserVehicle';
import Prices from './Prices';
import Rules from './Rules';
import Resources from './Resources';
import UserCourses from './UserCourses';
import QuestionPrompt from './QuestionPrompt';
import { CourseContext } from './CourseContext';
import Home from './Home';
import Quiz from './Quiz';
import { ThemeContext } from './ThemeContext';
import AccountDetails from './AccountDetails';
import RoadSignRecognition from './RoadSignRecognition';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { courses } = useContext(CourseContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("No user ID found in localStorage.");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    navigate('/AuthPage');
  };

  return (
    <motion.div
      className={`min-h-screen flex flex-col items-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className={`w-full shadow-md py-4 px-8 flex items-center justify-between ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
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
          <h1 className="text-2xl font-bold">Wizard Driving School</h1>
        </div>
        <div className="flex items-center">
          <motion.button
            className="mr-4 text-xl"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </motion.button>
          <motion.button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Logout
          </motion.button>
        </div>
      </motion.div>
      <nav className={`w-full py-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <ul className="flex justify-center space-x-4">
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link to="/user-dashboard/profile" className={`hover:text-blue-500 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <VscAccount className="mr-2" /> Profiles
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link to="/user-dashboard/schedule" className={`hover:text-blue-500 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <FaCalendarAlt className="mr-2" /> Schedules
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link to="/" className={`hover:text-blue-500 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <FaHome className="mr-2" /> Home
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link to="/user-dashboard/instructors" className={`hover:text-blue-500 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <FaChalkboardTeacher className="mr-2" /> Instructors
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link to="/user-dashboard/vehicle" className={`hover:text-blue-500 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <FaCar className="mr-2" /> Vehicles
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link to="/user-dashboard/prices" className={`hover:text-blue-500 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <FaTags className="mr-2" /> Prices
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link to="/user-dashboard/rules" className={`hover:text-blue-500 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <FaClipboardList className="mr-2" /> Rules
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link to="/user-dashboard/resources" className={`hover:text-blue-500 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <FaTools className="mr-2" /> Resources
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link to="/user-dashboard/courses" className={`hover:text-blue-500 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <FaBook className="mr-2" /> Courses
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link to="/user-dashboard/quiz" className={`hover:text-blue-500 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <FaQuestion className="mr-2" /> Quiz
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link to="/user-dashboard/ask-question" className={`hover:text-blue-500 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <AiFillOpenAI className="mr-2" /> WizardGPT
            </Link>
          </motion.li>
        {/*  <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link to="/user-dashboard/road-sign-recognition" className={`hover:text-blue-500 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <FaTools className="mr-2" /> Road Sign Recognition
            </Link>
          </motion.li>*/}
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link to={`/user-dashboard/account-details`} className={`hover:text-blue-500 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <VscAccount className="mr-2" /> Account Details
            </Link>
          </motion.li>
        </ul>
      </nav>
      <motion.div
        className={`flex-grow w-full max-w-5xl shadow-md mt-4 p-8 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/schedule" element={<UserSchedule theme={theme} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/instructors" element={<UserInstructors />} />
          <Route path="/vehicle" element={<UserVehicle />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/courses" element={<UserCourses courses={courses} />} />
          <Route path="/ask-question" element={<QuestionPrompt theme={theme} />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/account-details" element={<AccountDetails userId={userId} />} />
         {/* <Route path="/road-sign-recognition" element={<RoadSignRecognition />} />*/}
          <Route path="/" element={<UserProfile />} />
        </Routes>
      </motion.div>
    </motion.div>
  );
};

export default UserDashboard;