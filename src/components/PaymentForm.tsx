'use client';

import React, { useState } from 'react';

interface PaymentFormProps {
  amount: number;
  description: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, description }) => {
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    cvc: '',
    month: '',
    year: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPaymentError(null);

    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount, 
          description,
          source: {
            type: 'creditcard',
            ...cardDetails
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment');
      }

      const { id, transactionUrl } = await response.json();
      console.log('Payment initiated with ID:', id);
      
      // Redirect the user to the transaction URL for 3D Secure authentication
      window.location.href = transactionUrl;
    } catch (error) {
      setPaymentError('An error occurred while processing your payment.');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          value={cardDetails.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          value={cardDetails.number}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="cvc"
          placeholder="CVC"
          value={cardDetails.cvc}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="month"
          placeholder="Expiry Month (MM)"
          value={cardDetails.month}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="year"
          placeholder="Expiry Year (YY)"
          value={cardDetails.year}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Pay Now</button>
      </form>
      {paymentError && <p>{paymentError}</p>}
    </div>
  );
};

export default PaymentForm;