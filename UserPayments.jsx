import React from 'react';
import PaymentList from './PaymentList';
import './UserPayments.css';

const UserPayments = ({ payments }) => {
  const handleSelect = (payment) => {
    console.log('Selected payment:', payment);
    // Implement select logic
  };

  return (
    <div className="user-payments">
      <PaymentList 
        payments={payments} 
        onSelect={handleSelect} 
      />
    </div>
  );
};

export default UserPayments;
  