import React from 'react';
import { motion } from 'framer-motion';

const UserCourses = ({ courses }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="container mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Course List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Title</th>
              <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Duration</th>
              <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Syllabus</th>
            </tr>
          </thead>
          <motion.tbody>
            {courses.map((course) => (
              <motion.tr
                key={course._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                variants={rowVariants}
                whileHover="hover"
              >
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">{course.title}</td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">{course.duration}</td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">{course.syllabus}</td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserCourses;
