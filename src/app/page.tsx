'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [amount, setAmount] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: parseFloat(amount) * 100 })
    });
    const data: { url: string } = await response.json();
    router.push(data.url);
  };

  return (
    <main>
      <h1>Make a Payment</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in SAR"
          required
        />
        <button type="submit">Pay Now</button>
      </form>
    </main>
  );
}