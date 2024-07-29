// src/components/PaymentForm.tsx
'use client';
import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  description: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, description }) => {
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    year: '',
    month: '',
    cvc: ''
  });
  const [errors, setErrors] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'expiry') {
      const [month, year] = value.split('/');
      setCardDetails(prev => ({...prev, expiry: `${month}/${year}`, year:year, month:month }));
    }


    setCardDetails(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'number':
        error = value.replace(/\s/g, '').length !== 16 ? 'Card number must be 16 digits' : '';
        break;
      case 'name':
        error = value.length < 3 ? 'Name must be at least 3 characters' : '';
        break;
      case 'expiry':
        error = !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value) ? 'Invalid expiry date (MM/YY)' : '';
        break;
      case 'cvc':
        error = value.length !== 3 ? 'CVC must be 3 digits' : '';
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
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
    <div className="max-w-md mx-auto">
      <div className="mb-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <CreditCard className="text-gray-100" />
          <p className="text-gray-100 text-sm">{cardDetails.number || '•••• •••• •••• ••••'}</p>
        </div>
        <p className="text-gray-100 mb-2">{cardDetails.name || 'FULL NAME'}</p>
        <div className="flex justify-between">
          <p className="text-gray-100 text-sm">{cardDetails.expiry || 'MM/YY'}</p>
          <div className="flex items-center">
            <Lock className="text-gray-100 w-4 h-4 mr-1" />
            <p className="text-gray-100 text-sm">{cardDetails.cvc || '•••'}</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-200">Card Number</label>
          <input
            type="text"
            id="number"
            name="number"
            value={cardDetails.number}
            onChange={handleInputChange}
            className="mt-1 p-1 block w-full rounded-md bg-white bg-opacity-20 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-white focus:text-black"
            placeholder="1234 5678 9012 3456"
          />
          {errors.number && <p className="mt-1 text-sm text-red-400">{errors.number}</p>}
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-200">Cardholder Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={cardDetails.name}
            onChange={handleInputChange}
            className="mt-1 p-1 block w-full rounded-md bg-white bg-opacity-20 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-white focus:text-black"
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-200">Expiry Date</label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleInputChange}
              className="mt-1 p-1 block w-full rounded-md bg-white bg-opacity-20 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-white focus:text-black"
              placeholder="MM/YY"
            />
            {errors.expiry && <p className="mt-1 text-sm text-red-400">{errors.expiry}</p>}
          </div>
          <div className="flex-1">
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-200">CVC</label>
            <input
              type="text"
              id="cvc"
              name="cvc"
              value={cardDetails.cvc}
              onChange={handleInputChange}
              className="mt-1 p-1 block w-full rounded-md bg-white bg-opacity-20 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-white focus:text-black"
              placeholder="123"
            />
            {errors.cvc && <p className="mt-1 text-sm text-red-400">{errors.cvc}</p>}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:text-gray bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Pay {amount / 100} SAR
        </button>
      </form>
      {paymentError && <p>{paymentError}</p>}
    </div>
  );
};

export default PaymentForm;