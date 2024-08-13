import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const AddEditPayment = ({ onSubmit, onCancel, payment, theme, onDelete }) => {
  const [studentName, setStudentName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (payment) {
      setStudentName(payment.studentName);
      setAmount(payment.amount);
      setDate(payment.date);
      setStatus(payment.status);
    } else {
      setStudentName('');
      setAmount('');
      setDate('');
      setStatus('');
    }
  }, [payment]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedPayment = {
      studentName,
      amount,
      date,
      status
    };
    if (payment && payment._id) {
      updatedPayment._id = payment._id; // Ensure the ID is included for updates
    }
    onSubmit(updatedPayment);
  };

  const handleDelete = () => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this payment?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => onDelete(payment._id)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  return (
    <div className={`p-6 rounded shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h2 className="text-xl font-bold mb-4">{payment ? 'Edit Payment' : 'Add Payment'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Student Name:</label>
          <input 
            type="text" 
            value={studentName} 
            onChange={(e) => setStudentName(e.target.value)} 
            className={`w-full px-3 py-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`} 
            required 
          />
        </div>
        <div>
          <label className={`block font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Amount:</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            className={`w-full px-3 py-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`} 
            required 
          />
        </div>
        <div>
          <label className={`block font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Date:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className={`w-full px-3 py-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`} 
            required 
          />
        </div>
        <div>
          <label className={`block font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Status:</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            className={`w-full px-3 py-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`} 
            required>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded">
            {payment ? 'Update' : 'Add'}
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
          {payment && (
            <button 
              type="button" 
              onClick={handleDelete} 
              className="bg-red-500 text-white px-4 py-2 rounded">
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddEditPayment;
