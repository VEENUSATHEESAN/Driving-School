import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcFolder, FcCalendar, FcInTransit, FcGraduationCap, FcBusinessman, FcCurrencyExchange, FcServices, FcHome, FcUnlock } from "react-icons/fc";
import { motion } from 'framer-motion';
import './AdminDashboard.css';
import { ThemeContext } from './ThemeContext'; // Ensure correct path
import BarChartComponent from './BarChartComponent'; // Ensure correct path
import PieChartComponent from './PieChartComponent'; // Ensure correct path
import LineChartComponent from './LineChartComponent'; // Ensure correct path
import AreaChartComponent from './AreaChartComponent'; // Ensure correct path
import RadarChartComponent from './RadarChartComponent'; // Ensure correct path

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    console.log("User logged out");
    navigate('/admin/login');
  };

  const navVariants = {
    hidden: { x: -250, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const courseData = [
    { name: 'Basic', students: 30 },
    { name: 'Intermediate', students: 20 },
    { name: 'Advanced', students: 50 },
    { name: 'Defensive', students: 10 },
  ];

  const instructorData = [
    { name: 'Raja', courses: 5 },
    { name: 'Macullan', courses: 3 },
    { name: 'Robert', courses: 7 },
    { name: 'Karlis', courses: 9 },
    { name: 'Thalik', courses: 2 },
  ];

  const studentData = [
    { name: 'Enrolled', value: 200 },
    { name: 'Completed', value: 190 },
    { name: 'Dropped', value: 10 },
  ];

  const paymentData = [
    { month: 'Jan', payments: 5000 },
    { month: 'Feb', payments: 3000 },
    { month: 'Mar', payments: 7000 },
    { month: 'Apr', payments: 5000 },
    { month: 'May', payments: 2000 },
  ];

  const scheduleData = [
    { name: 'Morning', hours: 50 },
    { name: 'Afternoon', hours: 75 },
    { name: 'Evening', hours: 40 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`w-64 p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <button className="text-xl" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <ul className="space-y-4">
          <li>
            <Link to="/course-management" className={`hover:underline flex items-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              <FcFolder className="mr-3" /> Course Management
            </Link>
          </li>
          <li>
            <Link to="/instructor-management" className={`hover:underline flex items-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              <FcBusinessman className="mr-3"/> Instructor Management
            </Link>
          </li>
          <li>
            <Link to="/student-management" className={`hover:underline flex items-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              <FcGraduationCap className="mr-3"/> Student Management
            </Link>
          </li>
          <li>
            <Link to="/schedule" className={`hover:underline flex items-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              <FcCalendar className="mr-3"/> Schedule Management
            </Link>
          </li>
          <li>
            <Link to="/vehicle-management" className={`hover:underline flex items-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              <FcInTransit className="mr-3"/> Vehicle Management
            </Link>
          </li>
          <li>
            <Link to="/payment-management" className={`hover:underline flex items-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              <FcCurrencyExchange className="mr-3"/> Payment Management
            </Link>
          </li>
          <li>
            <Link to="/admin-settings" className={`hover:underline flex items-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              <FcServices className="mr-3"/> Admin Settings
            </Link>
          </li>
          <li>
            <Link to="/" className={`hover:underline flex items-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              <FcHome className="mr-3"/> Home
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className={`w-full text-left hover:underline flex items-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              <FcUnlock className="mr-3"/> Log Out
            </button>
          </li>
        </ul>
      </motion.nav>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={contentVariants}
        className={`flex-1 p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
      >
        <div className="flex items-center mb-8">
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
        <h3 className="text-xl font-semibold mb-4">Welcome, Admin!</h3>
        <p className={`mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}><b>Select an option from the menu to manage the system.</b></p>
        
        {/* Charts Section */}
        <div className="charts-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          <AreaChartComponent data={paymentData} dataKey="payments" xKey="month" title="Payments Over Time" theme={theme} />
          <PieChartComponent data={studentData} colors={COLORS} title="Student Enrollment Status" theme={theme} />
          <BarChartComponent data={courseData} dataKey="students" xKey="name" title="Courses and Enrolled Students" theme={theme} />
          <LineChartComponent data={paymentData} dataKey="payments" xKey="month" title="Monthly Payments" theme={theme} />
          {/*<BarChartComponent data={instructorData} dataKey="courses" xKey="name" title="Instructors and Assigned Courses" theme={theme} />
          <RadarChartComponent data={scheduleData} dataKey="hours" categoryKey="name" title="Schedule Hours" theme={theme} />*/}
         
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
