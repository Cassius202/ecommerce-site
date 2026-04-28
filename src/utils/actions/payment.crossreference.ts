'use server';

import { Payment } from "@/constants/types.paymentdatabase";
import { getPaymentByReference } from "./payment.actions";

export async function crossreference(reference: string, paystackAmountKobo: number, paystackEmail: string) {
   reference = reference.trim().replace(/\/$/, "");
  // 1. Get the payment snapshot data from YOUR database
  const paymentDetails: Payment | null = await getPaymentByReference(reference);

  if (!paymentDetails) {
    throw new Error("Payment record not found. Possible fraud or RLS error.");
  }

  // 2. Security Check: Compare Paystack's reported amount with your DB's recorded amount
  // We use the amount stored in our DB as the source of truth.
  if (paystackAmountKobo < paymentDetails.amount || paymentDetails.amount === 0) {
    console.error(`CRITICAL: Amount mismatch! DB: ${paymentDetails.amount}, Paystack: ${paystackAmountKobo}`);
    throw new Error("Transaction integrity check failed: Amount mismatch.");
  }

  // 3. Security Check: Email match (Optional but good for logging)
  if (paymentDetails.email !== paystackEmail) {
    console.warn(`Email mismatch for reference ${reference}. DB: ${paymentDetails.email}, Paystack: ${paystackEmail}`);
    // We don't always throw here because users sometimes use different emails for Paystack
  }

  // 4. Status Check: Ensure we aren't verifying a payment that is already successful
  if (paymentDetails.status === 'success') {
     return { success: true, message: "Payment already processed." };
  }

  return {
    success: true,
    message: "Data integrity verified. Proceed to update database status.",
    dbRecord: paymentDetails // Return the record so your verification route can use it
  };
}