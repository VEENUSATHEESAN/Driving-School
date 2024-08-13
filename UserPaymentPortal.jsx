import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CurrencyConverter from './CurrencyConverter'; // Import the CurrencyConverter component

const UserPaymentPortal = ({ theme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { course } = location.state;

  const [showConverter, setShowConverter] = useState(false);

  const handlePayNow = () => {
    navigate('/EndrollPortal', { state: { course } });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.5 } },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center container mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="border rounded-lg shadow-lg p-8 max-w-md w-full mb-8 text-gray-900 dark:text-white"
        variants={containerVariants}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Payment Portal</h2>
        <p className="text-lg font-semibold mb-4">Course: {course.title}</p>
        <p className="text-lg font-semibold mb-4">Price: ${course.price}</p>
        
        <motion.button
          className="w-full bg-green-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition-colors duration-200"
          onClick={handlePayNow}
          variants={buttonVariants}
        >
          Pay Now
        </motion.button>

        <div className="mt-4 text-center">
          <button
            onClick={() => setShowConverter(!showConverter)}
            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
          >
            {showConverter ? 'Hide Currency Converter' : 'Show Currency Converter'}
          </button>
        </div>

        {showConverter && (
          <div className="mt-6">
            <CurrencyConverter />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UserPaymentPortal;
