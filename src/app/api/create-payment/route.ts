// src/app/api/create-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Moyasar } from '@/lib/moyasar';
import { PaymentData, PaymentResponse } from '@/types/moyasar';

export async function POST(request: NextRequest) {
  try {
    const { amount, description, source } = await request.json();

    const moyasar = new Moyasar(process.env.MOYASAR_SECRET_KEY!);
    
    const paymentData: PaymentData = {
      amount,
      currency: 'SAR',
      description,
      source,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-callback`,
    };

    const payment: PaymentResponse = await moyasar.payment.create(paymentData);

    // Instead of just returning the ID, return the transaction URL as well
    return NextResponse.json({
      id: payment.id,
      transactionUrl: payment.source.transaction_url
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating payment' }, { status: 500 });
  }
}