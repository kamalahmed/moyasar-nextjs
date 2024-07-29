import PaymentForm from '../components/PaymentForm';

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-6">Product Information</h1>
          <div className="space-y-2 text-white">
            <p><span className="font-semibold">Product Name:</span> Course on Akidah</p>
            <p><span className="font-semibold">Price:</span> 100 SAR</p>
            <p><span className="font-semibold">Description:</span> This course will teach you the basics of Akidah.</p>
            <p><span className="font-semibold">Quantity:</span> 1</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Make a Payment</h2>
          <PaymentForm amount={10000} description="Course on Akidah" />
        </div>
      </div>
    </div>
  );
}