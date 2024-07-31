// components/MoyasarDefaultForm.js
"use client";
import { useEffect, useState } from 'react';
import Script from 'next/script';

const MoyasarDefaultForm = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (isScriptLoaded && typeof window !== 'undefined' && window.Moyasar) {
      window.Moyasar.init({
        element: '.mysr-form',
        amount: 1000, // Amount in the smallest currency unit
        currency: 'SAR',
        description: 'Coffee Order #1',
        publishable_api_key: process.env.NEXT_PUBLIC_MOYASAR_PUBLISHABLE_KEY,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-callback`,
        methods: ['creditcard'],
      });
    }
  }, [isScriptLoaded]);

  return (
    <>
      <div className="mysr-form"></div>
      <link
          rel="stylesheet"
          href="https://cdn.moyasar.com/mpf/1.14.0/moyasar.css"
        />
      <Script
        src="https://cdn.moyasar.com/mpf/1.14.0/moyasar.js"
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />
    </>
  );
};

export default MoyasarDefaultForm;
