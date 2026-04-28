"use client";

import { ProductParams } from "@/constants/assets";
import { useState } from "react";
import { Ticket } from "lucide-react";
import AddressForm from "./AddressForm";
import { Address } from "@/utils/actions/address.actions";
import { checkUserAuth } from "@/utils/actions/auth.actions";
import toast from "react-hot-toast";
import { number } from "framer-motion";

interface OrderSummaryProps {
  product: ProductParams;
  quantity: number;
  addresses: Address[];
}

const OrderSummary = ({
  product,
  quantity,
  addresses: initialAddresses,
}: OrderSummaryProps) => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  const [selectedId, setSelectedId] = useState<string | null>(
    addresses.find((a) => a.is_default)?.id || addresses[0]?.id || null,
  );

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [coupon, setCoupon] = useState("");

  const subtotal = product.price * quantity;

  const shipping : number = product.product_shipping_fee || 0;

  const total = subtotal + shipping;

  const handlePayment = async () => {
    const auth = await checkUserAuth();
    if (!auth.user) {
      toast.error("Please Login to complete checkout");
      return;
    }

    //start paystack payment terminal
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: auth.user.email,
          amount: total,
          productID: product.id,
          quantity: quantity,
          addressID: selectedId,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text(); // Read stream once here for error
        console.error("Server Error:", errorText);
        toast.error("Payment failed to initialize");
        return;
      }

      const result = await res.json();

      if (result.url) {
        window.location.href = result.url;
      } 

    } catch (error) {
      console.error("Frontend Catch:", error);
      toast.error("Something went wrong with the server connection.");
    }
  };

  const handleNewAddress = (newAddr: Address) => {
    setAddresses((prev) => [...prev, newAddr]);
    setSelectedId(newAddr.id);
    setIsAddingNew(false);
  };

  return (
    <div className="md:max-w-md lg:max-w-lg max-sm:w-full bg-zinc-950 border border-zinc-900 rounded-3xl p-6 sticky top-28 shadow-2xl">
      <h2 className="font-black text-lg text-white tracking-tighter uppercase mb-5 flex items-center gap-2">
        Summary <span className="h-1 w-1 rounded-full bg-blue-500" />
      </h2>

      {/* Address Management Section */}
      <div className="mb-6 border-b border-zinc-900/50 pb-6">
        {addresses.length > 0 && !isAddingNew ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                Shipping To
              </p>
              <button
                onClick={() => setIsAddingNew(true)}
                className="text-[10px] text-blue-500 font-bold hover:underline"
              >
                + New
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {addresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => setSelectedId(addr.id)}
                  className={`px-4 py-2 rounded-xl border text-[10px] uppercase font-black transition-all whitespace-nowrap ${
                    selectedId === addr.id
                      ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20"
                      : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700"
                  }`}
                >
                  {addr.label}
                </button>
              ))}
            </div>

            {selectedId && (
              <p className="text-[10px] text-zinc-500 italic truncate px-1">
                {addresses.find((a) => a.id === selectedId)?.street_address}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                Delivery Details
              </p>
              {addresses.length > 0 && (
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="text-[10px] text-zinc-500 font-bold"
                >
                  Cancel
                </button>
              )}
            </div>
            <AddressForm onSuccess={handleNewAddress} />
          </div>
        )}
      </div>

      {/* Totals Section */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 w-3.5 h-3.5" />
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon"
              className="w-full rounded-xl border border-zinc-900 bg-zinc-900/30 py-2.5 pl-10 pr-4 text-xs text-zinc-300 placeholder:text-zinc-700 focus:outline-none transition-all"
            />
          </div>
          <button className="px-4 rounded-xl bg-zinc-200 text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
            Apply
          </button>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-[11px] text-zinc-500">
            <p>Subtotal ({quantity} items)</p>
            <p className="text-zinc-300">${subtotal.toLocaleString()}</p>
          </div>
          <div className="flex justify-between text-[11px] text-zinc-500">
            <p>Shipping</p>
            <p className="text-zinc-300">
              {shipping === 0 ? "FREE" : `$${shipping.toLocaleString()}`}
            </p>
          </div>
          <div className="flex justify-between items-center pt-3 mt-1 border-t border-zinc-900">
            <h3 className="font-bold text-zinc-500 uppercase tracking-widest text-[10px]">
              Total
            </h3>
            <p className="text-2xl font-black text-white tracking-tighter">
              ${total.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-6">
        <button
          onClick={handlePayment}
          disabled={!selectedId}
          className="cursor-pointer w-full group relative flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-black py-4 rounded-xl transition-all overflow-hidden"
        >
          <span className="relative z-10 uppercase tracking-widest text-[13px]">
            {selectedId ? "Pay Now" : "Select Address"}
          </span>
        </button>
        <p className="text-[8px] text-zinc-600 text-center mt-4 font-medium uppercase tracking-[0.3em]">
          Secure via Paystack
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
