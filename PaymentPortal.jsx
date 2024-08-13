import React, { useState } from 'react';
import './PaymentPortal.css';

const PaymentPortal = ({ onPaymentSubmit }) => {
  const [studentName, setStudentName] = useState('');
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePaymentSubmit = (paymentDetails) => {
    console.log('Payment submitted:', paymentDetails);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const paymentDetails = {
      studentName,
      amount,
      cardNumber,
      expiryDate,
      cvv,
    };
    onPaymentSubmit(paymentDetails);


  };

  return (
    <div className="payment-portal-container">
      <h2>Payment Portal</h2>
      <form onSubmit={handleSubmit}>
        <label>Student Name:</label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <label>Card Number:</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
        <label>Expiry Date:</label>
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
        <label>CVV:</label>
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentPortal;
