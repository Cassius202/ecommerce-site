"use client";

import { useState } from "react";
import { createAddress, AddressDTO, Address } from "@/utils/actions/address.actions";
import { MapPin, Phone, User, Building2, Tag } from "lucide-react";
import { nigerianStates } from "@/constants/Constants";

const AddressForm = ({ onSuccess }: { onSuccess: (newAddr: Address) => void }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    const data: AddressDTO = {
      label: (formData.get("label") as string) || "Home",
      full_name: formData.get("full_name") as string,
      phone_number: formData.get("phone_number") as string,
      street_address: formData.get("street_address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postal_code: null,
      is_default: false,
    };

    try {
      const result = await createAddress(data);
      onSuccess(result);
    } catch (err: any) {
      setError(err.message || "Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300"
    >
      {error && (
        <p className="text-red-500 text-[10px] font-bold uppercase tracking-tight">
          {error}
        </p>
      )}
      
      {/* Row 1: Full Name */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 w-3.5 h-3.5" />
        <input 
          name="full_name" 
          required 
          placeholder="Full Name" 
          className="w-full rounded-xl border border-zinc-900 bg-zinc-900/30 py-2.5 pl-10 pr-4 text-xs text-zinc-300 placeholder:text-zinc-700 focus:border-zinc-700 focus:outline-none transition-all" 
        />
      </div>

      {/* Row 2: Label & Phone Number Split */}
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 w-3.5 h-3.5" />
          <input 
            name="label" 
            placeholder="Label (e.g. Home)" 
            className="w-full rounded-xl border border-zinc-900 bg-zinc-900/30 py-2.5 pl-10 pr-4 text-xs text-zinc-300 placeholder:text-zinc-700 focus:border-zinc-700 focus:outline-none transition-all" 
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 w-3.5 h-3.5" />
          <input 
            name="phone_number" 
            required 
            placeholder="Phone Number" 
            className="w-full rounded-xl border border-zinc-900 bg-zinc-900/30 py-2.5 pl-10 pr-4 text-xs text-zinc-300 placeholder:text-zinc-700 focus:border-zinc-700 focus:outline-none transition-all" 
          />
        </div>
      </div>

      {/* Row 3: Street Address */}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 w-3.5 h-3.5" />
        <input 
          name="street_address" 
          required 
          placeholder="Street Address" 
          className="w-full rounded-xl border border-zinc-900 bg-zinc-900/30 py-2.5 pl-10 pr-4 text-xs text-zinc-300 placeholder:text-zinc-700 focus:border-zinc-700 focus:outline-none transition-all" 
        />
      </div>

      {/* Row 4: City & State Split */}
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 w-3.5 h-3.5" />
          <input 
            name="city" 
            required 
            placeholder="City / LGA" 
            className="w-full rounded-xl border border-zinc-900 bg-zinc-900/30 py-2.5 pl-10 pr-4 text-xs text-zinc-300 placeholder:text-zinc-700 focus:border-zinc-700 focus:outline-none transition-all" 
          />
        </div>
        
        <div className="relative">
          <select 
            name="state" 
            defaultValue=""
            required 
            className="w-full rounded-xl border border-zinc-900 bg-zinc-900/30 py-2.5 px-4 text-xs text-zinc-300 focus:border-zinc-700 focus:outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled>State</option>
            {nigerianStates.map((state) => (
              <option key={state} value={state} className="bg-zinc-950">
                {state}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="8" height="5" viewBox="0 0 10 6" fill="none" className="stroke-zinc-600">
              <path d="M1 1L5 5L9 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <button 
        disabled={loading} 
        type="submit" 
        className="w-full py-3.5 mt-2 rounded-xl bg-zinc-100 text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 active:scale-[0.98]"
      >
        {loading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  );
};

export default AddressForm;