import React from 'react';
import { motion } from 'framer-motion';
import CalendarView from './CalendarView';

const UserSchedule = ({ theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={`user-schedule ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} p-6 rounded-lg shadow-md`}
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold mb-4"
      >
        User Schedule
      </motion.h2>
      <CalendarView theme={theme} />
    </motion.div>
  );
};

export default UserSchedule;
