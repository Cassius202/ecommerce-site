"use client";

import { ProductParams } from "@/constants/assets";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react"; // Install lucide-react if you haven't
import { toast } from "react-hot-toast";

interface BuyNowParams {
  product: ProductParams;
  categoryName: string;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

const ProductDetails = ({
  product,
  categoryName,
  quantity,
  setQuantity,
}: BuyNowParams) => {
  
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => {
    if (prev <= 1) {
      return prev 
    } else {
      return prev - 1
    }
  });

return (
    <div className="max-w-full bg-zinc-950/50 border border-zinc-900 rounded-3xl p-6 backdrop-blur-sm h-max">
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-blue-500 font-bold mb-1">
          {categoryName}
        </p>
        <h1 className="text-2xl font-black text-white tracking-tight leading-none">
          {product.name}
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center border-t border-zinc-900 pt-8">
        {/* Table Headers */}
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Item</div>
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold text-center">Price</div>
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold text-right">Quantity</div>

        {/* Product Image */}
        <div className="col-span-1 relative aspect-square w-20 bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
          <Image 
            src={product.image_url_array[0]} 
            alt={product.name} 
            fill
            className="object-cover transition-transform duration-500 hover:scale-110" 
          />
        </div>

        {/* Price */}
        <div className="col-span-1 text-center">
          <p className="text-lg font-black text-white">
            ${product.price.toLocaleString()}
          </p>
        </div>

        {/* Quantity Controller */}
        <div className="col-span-1 flex justify-end">
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 overflow-hidden">
            <input 
              type="number"
              className="w-10 bg-transparent text-center text-sm font-bold text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              value={quantity} 
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 1) setQuantity(val);
              }}
            />
            <div className="flex flex-col border-l border-zinc-800 ml-1">
              <button 
                onClick={increment}
                className="px-1.5 py-0.5 hover:bg-zinc-800 transition-colors border-b border-zinc-800 text-zinc-400 hover:text-white"
                aria-label="Increase quantity"
              >
                <ChevronUp size={14} strokeWidth={3} />
              </button>
              <button 
                onClick={decrement}
                className="px-1.5 py-0.5 hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                aria-label="Decrease quantity"
              >
                <ChevronDown size={14} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;