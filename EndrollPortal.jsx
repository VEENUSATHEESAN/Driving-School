import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Confetti from 'react-confetti';
import Cards from 'react-credit-cards-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import './CreditCardStyles.css'; // Import the custom styles
import './credit.scss';
import invoiceTemplate from '/IMAGES/Receipt.jpg'; // Make sure this path is correct
import { motion } from 'framer-motion';

const EndrollPortal = ({ theme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { course } = location.state || {};
  const [studentName, setStudentName] = useState('');
  const [amount, setAmount] = useState(course ? course.price : '');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [focused, setFocused] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const details = {
      studentName,
      amount,
      courseTitle: course ? course.title : '',
    };

    try {
      const response = await axios.post('http://localhost:5000/api/enroll', details);
      setSuccessMessage('You successfully enrolled.');
      setPaymentDetails(response.data);
    } catch (error) {
      console.error('There was an error processing your enrollment!', error);
    }
  };

  const generatePDF = () => {
    const input = document.getElementById('invoice');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('invoice.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF', error);
      });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
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
        className="rounded-lg shadow-lg p-8 max-w-md w-full mb-8 text-gray-900 dark:text-white"
        variants={formVariants}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Payment Portal</h2>
        {successMessage ? (
          <div className="text-center">
            <p className="text-green-500 mb-6">{successMessage}</p>
            {paymentDetails && (
              <div className="mb-6">
                <Confetti />
                <h3 className="text-xl font-semibold mb-4">Enrollment Details:</h3>
                <div id="invoice" className="relative">
                  <img src={invoiceTemplate} alt="Invoice Template" className="w-full" />
                  <div className="absolute top-32 left-10 text-black">
                    <p><strong>NAME:</strong> {paymentDetails.studentName}</p>
                    <p><strong>COURSE:</strong> {paymentDetails.courseTitle}</p>
                    <p><strong>AMOUNT:</strong> ${paymentDetails.amount}</p>
                  </div>
                </div>
              </div>
            )}
            <motion.button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
              onClick={generatePDF}
              variants={buttonVariants}
            >
              Download Invoice
            </motion.button>
            <motion.button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200 ml-4"
              onClick={() => navigate('/user-dashboard')}
              variants={buttonVariants}
            >
              Go to Dashboard
            </motion.button>
          </div>
        ) : (
          <motion.form onSubmit={handleSubmit} className="space-y-4" variants={formVariants}>
            <div className="flex justify-center mb-6">
              <Cards
                number={cardNumber}
                name={studentName}
                expiry={expiryDate}
                cvc={cvv}
                focused={focused}
              />
            </div>
            <div>
              <label className="block mb-2">Student Name:</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                onFocus={() => setFocused('name')}
                required
                className={`w-full p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-gray-100 text-black'} rounded`}
              />
            </div>
            <div>
              <label className="block mb-2">Amount:</label>
              <input
                type="number"
                value={amount}
                readOnly
                className={`w-full p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-gray-100 text-black'} rounded`}
              />
            </div>
            <div>
              <label className="block mb-2">Card Number:</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                onFocus={() => setFocused('number')}
                required
                className={`w-full p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-gray-100 text-black'} rounded`}
              />
            </div>
            <div>
              <label className="block mb-2">Expiry Date:</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                onFocus={() => setFocused('expiry')}
                required
                className={`w-full p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-gray-100 text-black'} rounded`}
              />
            </div>
            <div>
              <label className="block mb-2">CVV:</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                onFocus={() => setFocused('cvc')}
                required
                className={`w-full p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-gray-100 text-black'} rounded`}
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition-colors duration-200"
              variants={buttonVariants}
            >
              Submit Payment
            </motion.button>
          </motion.form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EndrollPortal;
