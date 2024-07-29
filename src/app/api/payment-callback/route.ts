import { NextRequest, NextResponse } from 'next/server';
import { Moyasar } from '@/lib/moyasar';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'No payment ID provided' }, { status: 400 });
  }

  try {
    const moyasar = new Moyasar(process.env.MOYASAR_SECRET_KEY!);
    const payment = await moyasar.payment.fetch(id);

    // Verify the payment status server-side
    if (payment.status === 'paid') {
      // Here you can update your database with the confirmed payment status
      // Example: await updatePaymentStatus(id, payment.status, payment.amount);

      return NextResponse.json({
        status: payment.status,
        amount: payment.amount,
        message: 'Payment verified successfully'
      });
    } else {
      return NextResponse.json({
        status: payment.status,
        message: 'Payment not completed'
      });
    }
  } catch (error) {
    console.error('Error fetching payment status:', error);
    return NextResponse.json({ error: 'Error verifying payment' }, { status: 500 });
  }
}