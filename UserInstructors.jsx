import React, { useContext } from 'react';
import { InstructorContext } from './InstructorContext';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const UserInstructors = () => {
  const { instructors } = useContext(InstructorContext);

  return (
    <motion.div
      className="container mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
        variants={itemVariants}
      >
        Instructors
      </motion.h2>
      <motion.table
        className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
        variants={itemVariants}
      >
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">Name</th>
            <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">Email</th>
            <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">Availability</th>
            <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">Assigned Lessons</th>
          </tr>
        </thead>
        <motion.tbody
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {instructors.map((instructor) => (
            <motion.tr
              key={instructor._id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
              variants={itemVariants}
            >
              <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">{instructor.name}</td>
              <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">{instructor.email}</td>
              <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">{instructor.availability}</td>
              <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">{instructor.assignedLessons.join(', ')}</td>
            </motion.tr>
          ))}
        </motion.tbody>
      </motion.table>
    </motion.div>
  );
};

export default UserInstructors;
