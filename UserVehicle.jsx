import React, { useContext } from 'react';
import { VehicleContext } from './VehicleContext';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const UserVehicle = () => {
  const { vehicles } = useContext(VehicleContext);

  return (
    <motion.div
      className="container mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
        variants={itemVariants}
      >
        User Vehicles
      </motion.h1>
      <motion.ul
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {vehicles.map(vehicle => (
          <motion.li
            key={vehicle._id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white dark:bg-gray-700"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{vehicle.name}</h2>
            <p className="text-gray-700 dark:text-gray-300">Type: {vehicle.type}</p>
            <p className="text-gray-700 dark:text-gray-300">Availability: {vehicle.availability}</p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default UserVehicle;
