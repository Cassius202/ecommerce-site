// pages/confirmation.js or app/confirmation/page.js
import { useSearchParams } from 'next/navigation'; // Next.js 13+
// import { useEffect } from 'react';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  
  const reference = searchParams.get('reference');
  const amount = searchParams.get('amount');
  const txRef = searchParams.get('tx_ref');
  
  // Still verify on backend for security!
  // useEffect(() => {
  //   if (reference) {
  //     verifyPayment(reference);
  //   }
  // }, [reference]);

  return (
    <div className="max-w-md mx-auto p-8">
      {/* Same UI as before, but using query params */}
      <h1>Payment Successful!</h1>
      
      <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-lg">
        <div>
          <span className="text-gray-500 text-sm">Reference</span>
          <p className="font-mono text-xs">{reference}</p>
        </div>
        <div>
          <span className="text-gray-500 text-sm">Amount</span>
          <p className="font-semibold text-green-600">
            ₦{(parseInt(amount) / 100).toLocaleString()}
          </p>
        </div>
        <div>
          <span className="text-gray-500 text-sm">Order ID</span>
          <p className="font-semibold">{txRef}</p>
        </div>
      </div>
    </div>
  );
};