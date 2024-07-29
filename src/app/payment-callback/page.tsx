'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface PaymentStatus {
  status: string;
  amount?: number;
  message: string;
}

export default function PaymentCallbackPage() {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const paymentId = searchParams.get('id');
    if (paymentId) {
      verifyPayment(paymentId);
    } else {
      setError('Error: No payment ID found');
    }
  }, [searchParams]);

  const verifyPayment = async (paymentId: string) => {
    try {
      const response = await fetch(`/api/payment-callback?id=${paymentId}`);
      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }
      const data: PaymentStatus = await response.json();
      setPaymentStatus(data);
    } catch (error) {
      console.error('Error verifying payment:', error);
      setError('Error verifying payment');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!paymentStatus) {
    return <div>Verifying payment...</div>;
  }

  return (
    <div>
      <h1>Payment Status</h1>
      <p>Status: {paymentStatus.status}</p>
      {paymentStatus.amount && <p>Amount: {paymentStatus.amount / 100} SAR</p>}
      <p>Message: {paymentStatus.message}</p>
    </div>
  );
}