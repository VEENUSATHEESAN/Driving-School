import React, { useContext, useEffect, useState } from 'react';
import PaymentList from './PaymentList';
import PaymentDetails from './PaymentDetails';
import AddEditPayment from './AddEditPayment';
import axios from 'axios';
import { ThemeContext } from './ThemeContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Error fetching payments.');
    }
  };

  const handleSelectPayment = (payment) => {
    setSelectedPayment(payment);
    setIsEditing(false);
  };

  const handleAddPayment = () => {
    setSelectedPayment(null);
    setIsEditing(true);
  };

  const handleEditPayment = () => {
    setIsEditing(true);
  };

  const handleAddEditPayment = async (payment) => {
    if (payment._id) {
      // Edit payment
      try {
        await axios.put(`http://localhost:5000/api/payments/${payment._id}`, payment);
        fetchPayments();
        toast.success('Payment updated successfully!');
      } catch (error) {
        console.error('Error updating payment:', error);
        toast.error('Error updating payment.');
      }
    } else {
      // Add new payment
      try {
        await axios.post('http://localhost:5000/api/payments', payment);
        fetchPayments();
        toast.success('Payment added successfully!');
      } catch (error) {
        console.error('Error adding payment:', error);
        toast.error('Error adding payment.');
      }
    }
    setSelectedPayment(null);
    setIsEditing(false);
  };

  const handleDeletePayment = async (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this payment?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:5000/api/payments/${id}`);
              fetchPayments();
              toast.success('Payment deleted successfully!');
            } catch (error) {
              console.error('Error deleting payment:', error);
              toast.error('Error deleting payment.');
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const handleCancel = () => {
    setSelectedPayment(null);
    setIsEditing(false);
  };

  const handleCloseDetails = () => {
    setSelectedPayment(null);
  };

  return (
    <motion.div 
      className={`container mx-auto p-4 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <motion.img 
            src="/IMAGES/newlogo.png" 
            alt="Online Driving School Logo" 
            className="w-20 h-20 mr-4" 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Wizard Driving School</h1>
        </div>
        <button className="text-xl" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <PaymentList 
          payments={payments} 
          onSelect={handleSelectPayment} 
          onDelete={handleDeletePayment} 
          theme={theme}
        />
      </motion.div>
      <motion.button 
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddPayment}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Payment
      </motion.button>
      {selectedPayment && !isEditing && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <PaymentDetails 
            payment={selectedPayment} 
            onEdit={handleEditPayment} 
            onClose={handleCloseDetails} 
            theme={theme} 
          />
        </motion.div>
      )}
      {isEditing && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <AddEditPayment 
            payment={selectedPayment} 
            onSubmit={handleAddEditPayment} 
            onCancel={handleCancel} 
            theme={theme} 
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default PaymentManagement;
