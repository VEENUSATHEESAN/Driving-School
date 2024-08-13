import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import 'tailwindcss/tailwind.css';

const initialStudents = [
  { id: 1, name: 'John Doe', age: 20, email: 'john@gmail.com', profilePicture: '/IMAGES/john.jpg', details: 'Received an A grade in Advanced Driving Techniques.' },
  { id: 2, name: 'Jane Smith', age: 22, email: 'jane@gmail.com', profilePicture: '/IMAGES/jane.jpg', details: 'Excelled in Defensive Driving Course with a B+ grade.' },
  { id: 3, name: 'Alice Johnson', age: 21, email: 'alice@yahoo.com', profilePicture: '/IMAGES/alice.jpg', details: 'Completed Beginner\'s Driving Course with distinction.' },
  { id: 4, name: 'Bob Brown', age: 23, email: 'bob@yahoo.com', profilePicture: '/IMAGES/bob.jpg', details: 'Achieved a perfect score in the Eco-Friendly Driving Course.' },
  { id: 5, name: 'Charlie White', age: 24, email: 'charlie@gmail.com', profilePicture: '/IMAGES/charlie.jpg', details: 'Received a B grade in the Commercial Driver Training program.' },
  { id: 6, name: 'David Black', age: 25, email: 'david@yahoo.com', profilePicture: '/IMAGES/david.jpg', details: 'Outstanding performance in the Motorcycle Riding Course with an A- grade.' },
  { id: 7, name: 'Eva Green', age: 26, email: 'eva@gmail.com', profilePicture: '/IMAGES/eva.jpg', details: 'Completed Intermediate Driving Course with a B+ grade.' },
  { id: 8, name: 'Frank Blue', age: 27, email: 'frank@gmail.com', profilePicture: '/IMAGES/frank.jpg', details: 'Achieved top marks in the Teen Driver Education Program.' },
  { id: 9, name: 'Grace Red', age: 28, email: 'grace@yahoo.com', profilePicture: '/IMAGES/grace.jpg', details: 'Excelled in the Senior Citizen Driving Course with a B+ grade.' },
  { id: 10, name: 'Henry Yellow', age: 29, email: 'henry@gmail.com', profilePicture: '/IMAGES/henry.jpg', details: 'Received an A grade in Refresher Driving Course.' },
];

const UserProfile = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const profileAnimation = useSpring({
    opacity: selectedStudent ? 1 : 0,
    transform: selectedStudent ? 'translateY(0)' : 'translateY(50px)',
    config: { duration: 500 },
  });

  const pictureAnimation = useSpring({
    transform: selectedStudent ? 'rotate(360deg)' : 'rotate(0deg)',
    config: { duration: 1000 },
  });

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6'>Profiles</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {initialStudents.map((student) => (
          <motion.div
            key={student.id}
            className='flex flex-col items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow'
            onClick={() => setSelectedStudent(student)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={student.profilePicture} alt={student.name} className='w-24 h-24 rounded-full mb-4 border-2 border-gray-300 dark:border-gray-600' />
            <p className='text-center text-lg font-medium text-gray-900 dark:text-white'>{student.name}</p>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedStudent && (
          <animated.div
            className='mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md'
            style={profileAnimation}
          >
            <h3 className='text-xl font-semibold text-center text-gray-900 dark:text-white mb-4'>Details for {selectedStudent.name}</h3>
            <div className='flex flex-col items-center'>
              <animated.img 
                src={selectedStudent.profilePicture} 
                alt={selectedStudent.name} 
                className='w-36 h-36 rounded-full mb-6 border-2 border-gray-300 dark:border-gray-600' 
                style={pictureAnimation}
              />
              <p className='text-lg text-gray-900 dark:text-white'><strong>Age:</strong> {selectedStudent.age}</p>
              <p className='text-lg text-gray-900 dark:text-white'><strong>Email:</strong> {selectedStudent.email}</p>
              <p className='text-lg mt-2 text-gray-900 dark:text-white'>{selectedStudent.details}</p>
            </div>
          </animated.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;
