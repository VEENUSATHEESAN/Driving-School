import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { yoyo: Infinity } },
};

const Prices = () => {
  const navigate = useNavigate();
  const courses = [
    {
      id: 1,
      title: 'Basic Driving Course',
      price: 100,
      image: '/IMAGES/dark1.jpg',
      description: 'Learn the basics of driving, including road rules and vehicle control.'
    },
    {
      id: 2,
      title: 'Intermediate Driving Course',
      price: 200,
      image: '/IMAGES/dark2.jpg',
      description: 'Enhance your driving skills with more advanced techniques.'
    },
    {
      id: 3,
      title: 'Advanced Driving Course',
      price: 300,
      image: '/IMAGES/dark3.jpg',
      description: 'Master advanced driving maneuvers and highway driving.'
    },
    {
      id: 4,
      title: 'Defensive Driving Course',
      price: 150,
      image: '/IMAGES/dark4.jpg',
      description: 'Learn to anticipate and avoid potential road hazards.'
    },
    {
      id: 5,
      title: 'Night Driving Course',
      price: 180,
      image: '/IMAGES/dark5.jpg',
      description: 'Gain confidence in driving safely at night.'
    },
    {
      id: 6,
      title: 'Winter Driving Course',
      price: 220,
      image: '/IMAGES/light3.jpg',
      description: 'Learn to handle your vehicle in snowy and icy conditions.'
    },
    {
      id: 7,
      title: 'Highway Driving Course',
      price: 250,
      image: '/IMAGES/light8.jpg',
      description: 'Get comfortable with driving on highways and expressways.'
    },
    {
      id: 8,
      title: 'City Driving Course',
      price: 200,
      image: '/IMAGES/light9.jpg',
      description: 'Navigate city streets and heavy traffic with ease.'
    },
    {
      id: 9,
      title: 'Eco-Driving Course',
      price: 210,
      image: '/IMAGES/light10.jpg',
      description: 'Learn techniques to drive more efficiently and reduce fuel consumption.'
    },
    {
      id: 10,
      title: 'Emergency Maneuvers Course',
      price: 230,
      image: '/IMAGES/light11.jpg',
      description: 'Practice emergency braking, swerving, and other critical maneuvers.'
    },
    // Additional courses
    {
      id: 11,
      title: 'Off-Road Driving Course',
      price: 270,
      image: '/IMAGES/light12.jpg',
      description: 'Learn how to handle a vehicle on rugged terrains and off-road conditions.'
    },
    {
      id: 12,
      title: 'Parking Mastery Course',
      price: 120,
      image: '/IMAGES/light13.jpg',
      description: 'Master the art of parking in tight spaces and complex parking scenarios.'
    },
    {
      id: 13,
      title: 'Senior Driving Course',
      price: 180,
      image: '/IMAGES/light14.jpg',
      description: 'Tailored for senior drivers to stay safe and confident on the road.'
    },
    {
      id: 14,
      title: 'Motorcycle Riding Course',
      price: 260,
      image: '/IMAGES/light15.jpg',
      description: 'Learn to ride a motorcycle with confidence and safety.'
    },
    {
      id: 15,
      title: 'Electric Vehicle Driving Course',
      price: 220,
      image: '/IMAGES/light16.jpg',
      description: 'Understand the unique aspects of driving and maintaining an electric vehicle.'
    },
    {
      id: 16,
      title: 'Rural Driving Course',
      price: 190,
      image: '/IMAGES/light17.jpg',
      description: 'Navigate rural roads and understand the challenges of countryside driving.'
    },
    {
      id: 17,
      title: 'Luxury Car Driving Course',
      price: 300,
      image: '/IMAGES/light18.jpg',
      description: 'Learn the nuances of driving high-end luxury vehicles.'
    },
    {
      id: 18,
      title: 'Commercial Driving Course',
      price: 350,
      image: '/IMAGES/light19.jpg',
      description: 'Get trained for driving commercial vehicles like trucks and buses.'
    },
    {
      id: 19,
      title: 'Car Maintenance Course',
      price: 150,
      image: '/IMAGES/light20.jpg',
      description: 'Learn basic car maintenance to keep your vehicle in top condition.'
    },
    {
      id: 20,
      title: 'First-Time Driver Course',
      price: 100,
      image: '/IMAGES/light21.jpg',
      description: 'Perfect for new drivers to gain confidence and road knowledge.'
    },
  ];

  const handleEnroll = (course) => {
    navigate('/user-payment-portal', { state: { course } });
  };

  return (
    <motion.div
      className="container mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white"
        variants={cardVariants}
      >
        Prices
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {courses.map((course) => (
          <motion.div
            key={course.id}
            className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white dark:bg-gray-700"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{course.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Price: ${course.price}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{course.description}</p>
            <motion.button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
              onClick={() => handleEnroll(course)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              Enroll
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Prices;
