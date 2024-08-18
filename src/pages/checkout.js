import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "@/app/globals.css";

export default function Checkout() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Your Order Has Been Placed Successfully!
      </h1>
      <p className="text-gray-700 text-base mb-4">
        Thank you for your purchase. We are processing your order and will notify you once it has been shipped.
      </p>
      <button
        onClick={() => router.push('/')}
        className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
      >
        Back to Home
      </button>
    </div>
  );
}
