"use client";

import { Payment } from "@/constants/types.paymentdatabase";
import { InvoiceDocument } from "@/minor-components/InvoiceDocument";
import { Address, getAddressById } from "@/utils/actions/address.actions";
import { getPaymentByReference } from "@/utils/actions/payment.actions";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

interface DownloadButtonProps {
  amount: number | null;
  reference: string | null;
}

const DownloadButton = ({ reference, amount }: DownloadButtonProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<{
    payment: Payment | null;
    address: Address | null;
  }>({ payment: null, address: null });

  useEffect(() => {
    setIsMounted(true);
    
    // Sanitize reference: remove trailing slashes if they exist
    const cleanRef = reference?.replace(/\/$/, "");
    if (!cleanRef) return;

    const fetchAllData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Payment
        const paymentResult = await getPaymentByReference(cleanRef);
        
        if (paymentResult) {
          // 2. Fetch Address using the ID from payment
          const addressResult = await getAddressById(paymentResult.address_id);
          setState({ payment: paymentResult, address: addressResult });
        }
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [reference]);

  // Prevent Hydration errors
  if (!isMounted || !reference || !amount) return null;

  // Show loading button while either data is missing
  if (loading || !state.payment || !state.address) {
    return (
      <button
        disabled
        className="w-full bg-zinc-800 text-zinc-500 font-bold py-4 rounded-xl animate-pulse"
      >
        Fetching Details...
      </button>
    );
  }

  return (
    <div>
      <PDFDownloadLink
        document={
          <InvoiceDocument 
            data={state.payment} 
            amount={amount} 
            address={state.address} 
          />
        }
        fileName={`CassiusStores_Invoice_${reference.replace(/\/$/, "")}.pdf`}
        className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-[0.98] cursor-pointer"
      >
        {({ loading: pdfLoading }) =>
          pdfLoading ? "Preparing PDF..." : "Download Invoice"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default DownloadButton;