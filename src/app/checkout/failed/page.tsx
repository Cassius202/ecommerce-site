'use client';

import { useSearchParams } from "next/navigation";

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();

  const reason = searchParams.get('reason');
  const reference = searchParams.get('reference');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">

        {/* Icon */}
        <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl">
          ✕
        </div>

        {/* Title */}
        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          Payment Failed
        </h1>

        {/* Message */}
        <p className="mt-2 text-gray-600 leading-relaxed">
          {`We couldn’t process your payment. No funds were deducted from your account.`}
        </p>

        {/* Optional reason */}
        {reason && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg p-3">
            {reason}
          </div>
        )}

        {/* Reference */}
        {reference && (
          <p className="mt-4 text-xs text-gray-500">
            Reference: <span className="font-mono">{reference}</span>
          </p>
        )}

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => window.location.href = '/shop'}
            className="w-full py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
          >
            Try Again
          </button>

          <button
            onClick={() => window.location.href = '/support'}
            className="w-full py-3 rounded-xl bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
          >
            Contact Support
          </button>
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-xs text-gray-400">
          If this keeps happening, please share your reference with support.
        </p>
      </div>
    </div>
  );
}