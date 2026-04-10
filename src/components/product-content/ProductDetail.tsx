"use client";

import { ProductParams } from "@/constants/assets";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Heart, X, ShoppingCart } from "lucide-react";
import ImagesSection from "./ImagesSection";

interface ProductPageProps {
  product: ProductParams;
}

export default function ProductDetail({ product }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Calculate original price
  const calculateOriginalPrice = (currentPrice: number, discountPercent: number): number => {
    return Math.round((currentPrice / (1 - discountPercent / 100)) * 100) / 100;
  };

  const originalPrice = product.discount
    ? calculateOriginalPrice(product.price, product.discount)
    : product.price;

  const images = product.image_url_array || [];

  // ESC key to close modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsZoomed(false);
  }, []);

  useEffect(() => {
    if (isZoomed) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isZoomed, handleKeyDown]);

  return (
    <div className="min-h-screen bg-black text-zinc-100 pt-18">
      {/* Breadcrumb */}
      <div className="bg-zinc-950 border-b border-zinc-800 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>{`>`}</span>
            <Link href="/shop" className="hover:text-amber-400 transition-colors">Products</Link>
            <span>{`>`}</span>
            <span className="text-zinc-300 truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Images Section */}
          <ImagesSection
            name={product.name}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setIsZoomed={setIsZoomed}
            images={images}
          />

          {/* Product Info Section */}
          <div className="flex flex-col gap-8">
            <div>
              {product.brand && <p className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-2">{product.brand}</p>}
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-4xl font-bold text-white">${product.price.toLocaleString("en-US")}</span>
                {product.discount && product.discount > 0 && (
                  <>
                    <span className="text-xl text-zinc-500 line-through">${originalPrice.toLocaleString("en-US")}</span>
                    <span className="text-amber-500 font-semibold">Save ${(originalPrice - product.price).toLocaleString("en-US")}</span>
                  </>
                )}
              </div>
              <div className="text-sm">
                {product.quantity > 0 ? (
                  <span className="text-green-500 font-semibold">✓ {product.quantity} in stock</span>
                ) : (
                  <span className="text-red-500 font-semibold">Out of stock</span>
                )}
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-zinc-300 mb-3">Available Colors</p>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all font-medium capitalize ${
                        selectedColor === color ? "border-amber-500 bg-amber-500/10 text-amber-400" : "border-zinc-700 text-zinc-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                disabled={product.quantity === 0}
                className="flex-1 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-zinc-700 disabled:to-zinc-700 text-black font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 text-lg"
              >
                <ShoppingCart /> Add to Cart
              </button>
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-4 rounded-lg border-2 transition-all ${isWishlisted ? "border-red-500 bg-red-500/10 text-red-400" : "border-zinc-700 text-zinc-400 hover:border-red-500"}`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t border-zinc-800 pt-8">
                <h3 className="text-lg font-bold text-white mb-4">Description</h3>
                <p className="text-zinc-400 leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsZoomed(false)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors z-[110]">
            <X size={40} />
          </button>
          
          <div className="relative w-[90vw] h-[85vh]" onClick={(e) => e.stopPropagation()}>
             <Image
                src={images[selectedImage] || "/placeholder.jpg"}
                alt="Zoomed view"
                fill
                className="object-contain"
                priority
              />
          </div>
        </div>
      )}
    </div>
  );
}