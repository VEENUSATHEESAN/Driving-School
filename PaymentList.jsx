import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const PaymentList = ({ payments, onSelect, onDelete, theme }) => {
  const buttonClass = "px-4 py-2 rounded transition-all w-24"; // w-24 ensures all buttons are the same width

  const handleDelete = (paymentId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this payment?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => onDelete(paymentId)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  return (
    <div className="payment-list-container">
      <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Payment History</h2>
      <div className="overflow-x-auto">
        <table className={`min-w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Student Name</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment._id} className="border-t">
                <td className="px-4 py-2">{payment._id}</td>
                <td className="px-4 py-2">{payment.studentName}</td>
                <td className="px-4 py-2">${payment.amount}</td>
                <td className="px-4 py-2">{payment.date}</td>
                <td className="px-4 py-2">{payment.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <button 
                    className={`bg-yellow-500 text-white ${buttonClass} hover:bg-yellow-600`}
                    onClick={() => onSelect(payment)}>
                    View
                  </button>
                  <button 
                    className={`bg-green-500 text-white ${buttonClass} hover:bg-green-600`}
                    onClick={() => onSelect(payment)}>
                    Edit
                  </button>
                  <button 
                    className={`bg-red-500 text-white ${buttonClass} hover:bg-red-600`}
                    onClick={() => onDelete(payment._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentList;
