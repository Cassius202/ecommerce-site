"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // or any spinner
import { PaymentTransaction } from "@/constants/types.payment";

export interface VerificationData {
  success: boolean;
  data: PaymentTransaction;
  message: string;
  paystack_amount: number; //in kobo
}
export default function VerificationDisplay({ reference }: { reference: string | null }) {
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
  const verify = async () => {
    try {
      const res = await fetch(`/api/verify-payment/${reference}`);
      const data = await res.json();

      if (data.success) {
        router.push(`/checkout/success?reference=${reference}&amount=${data.paystackAmount}`);
      } else {
        // Option A: Send to a dedicated failed page
        router.push(`/checkout/failed?reference=${reference}&reason=${data.message}`);
      }
    } catch (err) {
      // Option B: Hard system error (e.g., API is down)
      setError(true); 
    }
  };

  if (reference) verify();
}, [reference, router]);

  if (error) {
    return <p className="text-red-500">Verification failed. Please contact support.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
       {/* Your Stone & Glass styled loader */}
      <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
      <h1 className="text-stone-50 text-2xl font-light">Verifying Payment</h1>
      <p className="text-zinc-400">Securing your transaction with Paystack...</p>
    </div>
  );
}