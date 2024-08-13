import React, { useState } from 'react';
import { BsDownload } from "react-icons/bs";
import { motion } from 'framer-motion';

const Resources = () => {
  const documents = [
    { name: 'Driving Manual', url: '/IMAGES/driving-manual.pdf' },
    { name: 'Traffic Signs Guide', url: '/IMAGES/traffic-signs-guide.pdf' },
    { name: 'Driver’s Safety Handbook', url: '/IMAGES/driver-safety-handbook.pdf' },
  ];

  const videos = [
    { title: 'Basic Driving Techniques', url: 'https://www.youtube.com/embed/gvim3YjvRp8?autoplay=1&mute=1' },
    { title: 'Parking Tips and Tricks', url: 'https://www.youtube.com/embed/MxbsBnPfHd8?autoplay=1&mute=1' },
    { title: 'Highway Driving Safety', url: 'https://www.youtube.com/embed/92qF_SmIC58?autoplay=1&mute=1' },
    { title: 'Road Safety Education', url: 'https://www.youtube.com/embed/vzMFWea-X7g?autoplay=1&mute=1' },
  ];

  const [currentVideo, setCurrentVideo] = useState(null);

  const handleVideoClick = (index) => {
    setCurrentVideo(index);
  };

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
        Resources
      </motion.h2>

      <motion.h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-300" variants={itemVariants}>
        Downloadable Documents
      </motion.h3>
      <motion.ul className="list-disc pl-5 mb-6 text-gray-700 dark:text-gray-300" variants={containerVariants}>
        {documents.map((doc, index) => (
          <motion.li key={index} className="mb-2" variants={itemVariants}>
            <a href={doc.url} download className="text-blue-500 dark:text-blue-400 hover:underline flex items-center">
              {doc.name}
              <BsDownload className="ml-2" />
            </a>
          </motion.li>
        ))}
      </motion.ul>

      <motion.h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-300" variants={itemVariants}>
        Instructional Videos
      </motion.h3>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={containerVariants}>
        {videos.map((video, index) => (
          <motion.div key={index} className="video-container" variants={itemVariants}>
            <iframe
              width="100%"
              height="315"
              src={currentVideo === index ? video.url.replace('mute=1', 'mute=0') : video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mb-2 rounded-lg shadow-md"
              onClick={() => handleVideoClick(index)}
            ></iframe>
            <p className="text-gray-600 dark:text-gray-300">{video.title}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Resources;
