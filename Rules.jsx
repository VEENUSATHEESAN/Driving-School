import React from 'react';
import { motion } from 'framer-motion';
import './Rules.css';

const Rules = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="container mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white" variants={itemVariants}>
        Driving School Rules and Regulations
      </motion.h2>
      <motion.ul className="list-disc pl-5 mb-6 text-gray-700 dark:text-gray-300" variants={containerVariants}>
        {[
          'Always attend your classes on time.',
          'Complete all assigned coursework and practice sessions.',
          'Respect your instructors and fellow students.',
          'Ensure your vehicle is in good working condition before each lesson.',
          "Always carry your learner's permit during practical sessions.",
          'Wear appropriate clothing and footwear for driving.',
          'No mobile phone use during driving lessons unless necessary for instruction.',
          'Notify the school in advance if you need to cancel or reschedule a lesson.',
          'Adhere to the scheduled lesson times and dates.',
          "Follow the instructor's directions and feedback carefully.",
        ].map((rule, index) => (
          <motion.li key={index} className="mb-2" variants={itemVariants}>
            {rule}
          </motion.li>
        ))}
      </motion.ul>

      <motion.h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white" variants={itemVariants}>
        General Driving Rules
      </motion.h2>
      <motion.ul className="list-disc pl-5 text-gray-700 dark:text-gray-300" variants={containerVariants}>
        {[
          'Always wear your seatbelt.',
          'Obey all traffic signals and signs.',
          'Do not drive under the influence of alcohol or drugs.',
          'Follow the speed limits and adjust your speed according to road conditions.',
          'Use indicators when turning or changing lanes.',
          'Maintain a safe distance from the vehicle in front of you.',
          'Do not use your mobile phone while driving.',
          'Give way to pedestrians at pedestrian crossings.',
          'Check mirrors and blind spots before making any maneuvers.',
          'Stay within your lane and avoid sudden lane changes.',
          'Do not drive when feeling tired or drowsy.',
          'Yield to emergency vehicles with active sirens or flashing lights.',
          'Keep your vehicle well-maintained and serviced regularly.',
          "Ensure your vehicle's documents (insurance, registration, etc.) are up-to-date.",
          'Be aware of and follow local driving laws and regulations.',
        ].map((rule, index) => (
          <motion.li key={index} className="mb-2" variants={itemVariants}>
            {rule}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default Rules;
