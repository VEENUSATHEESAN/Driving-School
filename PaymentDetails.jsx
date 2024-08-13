import React from 'react';

const PaymentDetails = ({ payment, onEdit, onClose, theme }) => {
  if (!payment) {
    return <div className="payment-details-container">No payment details available</div>;
  }

  return (
    <div className={`payment-details-container p-4 rounded shadow-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}>
      <h2 className="text-xl font-bold mb-4">Payment Details</h2>
      <div className="mb-2">
        <strong>Student Name:</strong> {payment.studentName}
      </div>
      <div className="mb-2">
        <strong>Amount:</strong> ${payment.amount}
      </div>
      <div className="mb-2">
        <strong>Date:</strong> {payment.date}
      </div>
      <div className="mb-2">
        <strong>Status:</strong> {payment.status}
      </div>
      <div className="flex justify-between">
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={onEdit}>
          Edit
        </button>
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;
