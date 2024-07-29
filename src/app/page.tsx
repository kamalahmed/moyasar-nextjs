// src/app/payment/page.tsx
import PaymentForm from '../components/PaymentForm';

export default function PaymentPage() {
  return (
    <div>
      <h1>Prodcut Information</h1>

      <p>Product Name: Course on Akidah</p>
      <p>Price: 100 SAR</p>
      <p>Description: This course will teach you the basics of Akidah.</p>
      <p>Quantity: 1</p>
      <h2>Make a Payment</h2>
      
      <PaymentForm amount={10000} description="Course on Akidah" />
    </div>
  );
}