"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Copy,
  Check,
  Home,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useState } from "react";
import DownloadButton from "./DownloadButton";
import { sendOrderEmail } from "@/minor-components/sendOrderEmail";

const formatCurrency = (kobo: number) =>
  `₦${(kobo / 100).toLocaleString()}`;

const PaymentDetailsContent = () => {
  const searchParams = useSearchParams();
  const amountParam = searchParams.get("amount");
  const reference = searchParams.get("reference");

  const amount = amountParam ? Number(amountParam) : null;

  const [copiedRef, setCopiedRef] = useState(false);

  const copyToClipboard = async (text: string | null) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedRef(true);
      toast.success("Reference copied");
      setTimeout(() => setCopiedRef(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
      toast.error("Failed to copy reference");
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-zinc-100 flex items-center justify-center p-4 md:p-6 relative">
      
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-zinc-950/50 backdrop-blur-2xl border border-zinc-800 p-6 md:p-10 rounded-[2rem] shadow-2xl">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <CheckCircle2 size={64} className="text-emerald-500 mb-4" />
          <h1 className="text-2xl font-bold">Payment Successful</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Your transaction was completed successfully.
          </p>
        </div>

        {/* Details */}
        <div className="space-y-6">

          {/* Reference */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
              Reference
            </label>
            <div className="relative flex items-center justify-between bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
              <span className="font-mono text-sm truncate pr-4">
                {reference || "N/A"}
              </span>
              <button
                onClick={() => copyToClipboard(reference)}
                disabled={!reference}
                className="text-zinc-500 hover:text-white transition active:scale-90"
              >
                {copiedRef ? (
                  <Check size={18} className="text-emerald-500" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Total Amount */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
              Total Paid
            </label>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
              <span className="text-lg font-semibold">
                {amount !== null ? formatCurrency(amount) : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 space-y-3">
          <DownloadButton amount={amount} reference={reference} />

          <Link
            href="/"
            className="w-full bg-zinc-900 text-zinc-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all border border-zinc-800"
          >
            <Home size={18} />
            Return Home
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-zinc-600">
          <ShieldCheck size={14} />
          <span className="text-[10px] uppercase tracking-wider font-medium">
            Secured by Paystack & Supabase
          </span>
        </div>
      </div>
    </div>
  );
};

export default function PaymentDetails() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-black flex items-center justify-center">
          <div className="text-zinc-400">Loading...</div>
        </div>
      }
    >
      <PaymentDetailsContent />
    </Suspense>
  );
}