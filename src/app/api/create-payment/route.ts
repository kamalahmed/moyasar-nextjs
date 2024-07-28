import { NextResponse } from 'next/server';
import Moyasar from 'moyasar';

const moyasar = new Moyasar(process.env.MOYASAR_SECRET_KEY as string);

interface RequestBody {
  amount: number;
}

export async function POST(request: Request) {
  const { amount }: RequestBody = await request.json();

  try {
    const payment = await moyasar.payment.create({
      amount: amount,
      currency: 'SAR',
      description: 'Payment for Order #1234',
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-callback`,
    });

    return NextResponse.json({ url: payment.source.transaction_url });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating payment' }, { status: 500 });
  }
}