import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loader from './Loader';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ThemeContext } from './ThemeContext';

const lightModeImages = [
  "/IMAGES/light1.png",
  "/IMAGES/light2.jpg",
  "/IMAGES/light3.jpg",
  "/IMAGES/light4.jpg",
  "/IMAGES/light5.jpg",
];

const darkModeImages = [
  "/IMAGES/dark1.jpg",
  "/IMAGES/dark2.jpg",
  "/IMAGES/dark3.jpg",
  "/IMAGES/dark4.jpg",
  "/IMAGES/dark5.jpg",
];

export const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const imagesToUse = theme === 'dark' ? darkModeImages : lightModeImages;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesToUse.length);
    }, 3000); // change image every 3 seconds

    return () => clearInterval(interval);
  }, [theme]);

  const handleGetStartedClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/AuthPage');
      setLoading(false);
    }, 2000); // simulate loading time, adjust as needed
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
      if (response.ok) {
        setSuccessMessage('Your message has been sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMessage('Failed to send your message. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: {
      scale: 1.2,
      transition: {
        yoyo: Infinity,
      },
    },
  };

  const confettiVariants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className={`flex flex-col min-h-screen text-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {loading && <Loader />}
      <motion.header
        className="relative py-5 animate-gradientChange bg-cover bg-center bg-no-repeat"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          src={theme === 'dark' ? '/IMAGES/dark.mp4' : '/IMAGES/light.mp4'}
          autoPlay
          loop
          muted
        ></video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <nav className="container mx-auto flex justify-between items-center px-6 relative z-10">
          <div className="flex items-center">
            <motion.img
              src="/IMAGES/newlogo.png"
              alt="Online Driving School Logo"
              className="w-20 h-20 mr-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <h1 className="text-2xl font-bold"><b>Wizard Driving School</b></h1>
          </div>
          <ul className="hidden md:flex space-x-6">
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/" className="hover:text-gray-400"><b>Home</b></Link></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><Link to="RegisterHere" className="hover:text-gray-400"><b>Register Here</b></Link></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><a href='#Contact' className="hover:text-gray-400"><b>Contact Us</b></a></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><a href='#Features' className="hover:text-gray-400"><b>Features</b></a></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><a href='#WhyChooseUs' className="hover:text-gray-400"><b>Why Choose Us</b></a></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/admin/login" className="hover:text-gray-400"><b>Admin</b></Link></motion.li>
          </ul>
          <button className="text-xl" onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
        </nav>
        <div className="container mx-auto text-center py-10 relative z-10">
          <h2 className="text-4xl font-semibold"><b>Welcome to the Online Driving School</b></h2>
          <p className="mt-4"><b>Your journey to becoming a safe driver starts here.</b></p>
          <motion.button
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-pink-600"
            onClick={handleGetStartedClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={buttonVariants}
            animate="show"
          >
            Get Started
          </motion.button>
          <motion.div
            className="confetti"
            initial="hidden"
            animate="show"
            variants={confettiVariants}
          >
          </motion.div>
        </div>
      </motion.header>

      <motion.section
        className="container mx-auto py-12"
        id="Features"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        variants={staggerVariants}
      >
        <h2 className="text-3xl font-semibold mb-6">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <img src="/IMAGES/online-courses.jpg" alt="Online Courses" className="w-full h-48 object-cover rounded-t-lg" />
            <h3 className="text-2xl font-semibold mt-4">Online Courses</h3>
            <p className="mt-2">Learn at your own pace with our comprehensive online courses.</p>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <img src="/IMAGES/certified-instructors.jpg" alt="Certified Instructors" className="w-full h-48 object-cover rounded-t-lg" />
            <h3 className="text-2xl font-semibold mt-4">Certified Instructors</h3>
            <p className="mt-2">Get training from experienced and certified driving instructors.</p>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <img src="/IMAGES/flexible-scheduling.jpg" alt="Flexible Schedule" className="w-full h-48 object-cover rounded-t-lg" />
            <h3 className="text-2xl font-semibold mt-4">Flexible Schedule</h3>
            <p className="mt-2">Choose class times that fit your busy schedule.</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="container mx-auto py-12"
        id="WhyChooseUs"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        variants={staggerVariants}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={itemVariants}
            >
              
              <h3 className="text-2xl font-semibold">Experienced Instructors</h3>
              <p className="mt-2">Our instructors have years of experience in teaching safe driving.</p>
            </motion.div>
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold">Comprehensive Curriculum</h3>
              <p className="mt-2">We cover all aspects of driving, from basics to advanced techniques.</p>
            </motion.div>
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold">Supportive Community</h3>
              <p className="mt-2">Join a community of learners and get support throughout your journey.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
        <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold">Affordable Rates</h3>
            <p className="mt-2">High-quality education at competitive prices.</p>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold">Proven Track Record</h3>
            <p className="mt-2">Thousands of students have successfully passed their driving tests.</p>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold">Student Support</h3>
            <p className="mt-2">Ongoing support and guidance even after course completion.</p>
          </motion.div>

      <motion.section 
        className="container mx-auto py-12" 
        id="Testimonials"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        variants={staggerVariants}
      >
        <h2 className="text-3xl font-semibold mb-6">What Our Students Say</h2>
        <div className="space-y-6">
          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <p className="italic">"The best driving school! The instructors are very professional and friendly."</p>
            <h4 className="mt-4 text-right text-blue-500">- John Doe</h4>
          </motion.div>
          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <p className="italic">"Great experience! The online courses were very helpful."</p>
            <h4 className="mt-4 text-right text-blue-500">- Jane Smith</h4>
          </motion.div>
        </div>
      </motion.section>
      
      <motion.section 
        className="bg-gray-200 dark:bg-gray-800 py-12" 
        id="News"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        variants={staggerVariants}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Latest News</h2>
          <div className="space-y-6">
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold">New Course Launch</h3>
              <p className="mt-2">We are excited to launch our new advanced driving course next month. Stay tuned for more details!</p>
            </motion.div>
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold">Discount Offer</h3>
              <p className="mt-2">Sign up for any course in the next week and get a 20% discount. Use code DRIVE20 at checkout.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      <motion.section
        className="container mx-auto py-12"
        id="Ads"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        variants={staggerVariants}
      >
        <h2 className="text-3xl font-semibold mb-6">Advertisements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <img src="/IMAGES/car-insurance.jpg" alt="Car Insurance" className="w-full h-48 object-cover rounded-t-lg" />
            <h3 className="text-2xl font-semibold mt-4">Car Insurance</h3>
            <p className="mt-2">Get the best deals on car insurance to keep you protected on the road.</p>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <img src="/IMAGES/vehicle-maintenance.jpg" alt="Vehicle Maintenance" className="w-full h-48 object-cover rounded-t-lg" />
            <h3 className="text-2xl font-semibold mt-4">Vehicle Maintenance</h3>
            <p className="mt-2">Find the best service providers for maintaining your vehicle in top condition.</p>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <img src="/IMAGES/driving-safety.jpg" alt="Driving Safety" className="w-full h-48 object-cover rounded-t-lg" />
            <h3 className="text-2xl font-semibold mt-4">Driving Safety</h3>
            <p className="mt-2">Equip yourself with the best safety products to ensure a secure driving experience.</p>
          </motion.div>
        </div>
      </motion.section>
      <section className="container mx-auto py-12">
  <h2 className="text-3xl font-semibold mb-6">Our Partners</h2>
  <Carousel
    showArrows={true}
    showStatus={false}
    showIndicators={false}
    infiniteLoop={true}
    autoPlay={true}
    interval={500}
  >
    <div className="flex justify-center">
      <img
        src="/IMAGES/ad1.jpg"
        alt="Ad 1"
        className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
      />
    </div>
    <div className="flex justify-center">
      <img
        src="/IMAGES/ad2.jpg"
        alt="Ad 2"
        className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
      />
    </div>
    <div className="flex justify-center">
      <img
        src="/IMAGES/ad3.jpg"
        alt="Ad 3"
        className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
      />
    </div>
    <div className="flex justify-center">
      <img
        src="/IMAGES/ad4.jpg"
        alt="Ad 4"
        className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
      />
    </div>
    <div className="flex justify-center">
      <img
        src="/IMAGES/ad5.jpg"
        alt="Ad 5"
        className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
      />
    </div>
    <div className="flex justify-center">
      <img
        src="/IMAGES/ad6.jpg"
        alt="Ad 6"
        className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
      />
    </div>
    <div className="flex justify-center">
      <img
        src="/IMAGES/ad7.png"
        alt="Ad 7"
        className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
      />
    </div>
    <div className="flex justify-center">
      <img
        src="/IMAGES/ad8.jpg"
        alt="Ad 8"
        className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
      />
    </div>
    <div className="flex justify-center">
      <img
        src="/IMAGES/ad9.jpg"
        alt="Ad 9"
        className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
      />
    </div>
    <div className="flex justify-center">
      <img
        src="/IMAGES/ad10.png"
        alt="Ad 10"
        className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
      />
    </div>
  </Carousel>
</section>
      <motion.section 
        id="Contact" 
        className="py-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        variants={staggerVariants}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
            <motion.input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.button 
              type="submit" 
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.section>
      
      <footer className="bg-gradient-to-r from-white to-black dark:from-gray-900 dark:to-black text-white py-4 animate-gradientChange">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Online Driving School. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/IMAGES/facebook-icon.webp" alt="Facebook" className="h-6 w-6" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/IMAGES/twitter-icon.png" alt="Twitter" className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/IMAGES/instagram-icon.png" alt="Instagram" className="h-6 w-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
