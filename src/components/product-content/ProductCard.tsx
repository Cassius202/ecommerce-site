'use client'

import { ProductParams } from "@/constants/assets"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

const ProductCard = ({ product, isMobile }: { product: ProductParams; isMobile: boolean }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  // Calculate original price from discount
  const calculateOriginalPrice = (currentPrice: number, discountPercent: number): number => {
    return Math.round((currentPrice / (1 - discountPercent / 100)) * 100) / 100
  }

  const originalPrice = product.discount
    ? calculateOriginalPrice(product.price, product.discount)
    : product.price

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className={`group relative w-full overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 transition-all duration-300 cursor-pointer ${
          isMobile 
            ? 'shadow-sm hover:shadow-md hover:border-zinc-700' 
            : 'shadow-md hover:shadow-lg hover:border-zinc-700'
        }`}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative w-full overflow-hidden bg-zinc-800">
          <div className={`relative ${isMobile ? 'aspect-square' : 'aspect-[1]'}`}>
            <Image
              src={product.image_url_array[0] || '/placeholder.jpg'}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-500 ${
                isHovered && !isMobile ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* Discount Badge - Amber */}
            {product.discount && product.discount > 0 && (
              <div className={`absolute right-2 top-2 flex items-center justify-center rounded-full bg-amber-500 shadow-lg ${
                isMobile 
                  ? 'px-2 py-0.5' 
                  : 'px-2.5 py-1'
              }`}>
                <span className={`font-bold text-black ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  -{product.discount}%
                </span>
              </div>
            )}

            {/* Low Stock Badge */}
            {product.quantity > 0 && product.quantity < 10 && (
              <div className={`absolute left-2 top-2 flex items-center justify-center rounded-full bg-red-600 shadow-lg ${
                isMobile 
                  ? 'px-2 py-0.5' 
                  : 'px-2.5 py-1'
              }`}>
                <span className={`font-semibold text-white ${isMobile ? 'text-xs' : 'text-xs'}`}>
                  Low Stock
                </span>
              </div>
            )}

            {/* Dark Overlay on Hover */}
            {isHovered && !isMobile && (
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-300" />
            )}
          </div>
        </div>

        {/* Content Container - Compact */}
        <div className={`flex flex-col ${isMobile ? 'gap-1.5 p-2' : 'gap-2 p-3'}`}>
          {/* Brand - Small */}
          {product.brand && (
            <p className={`font-medium text-zinc-400 ${isMobile ? 'text-xs' : 'text-xs'}`}>
              {product.brand}
            </p>
          )}

          {/* Product Name - 2 lines max */}
          <h3 className={`line-clamp-1 font-semibold text-zinc-100 leading-tight ${
            isMobile ? 'text-sm' : 'text-sm'
          }`}>
            {product.name}
          </h3>

          {/* Price Section - Prominent */}
          <div className={`flex items-center gap-2 ${isMobile ? 'pt-0.5' : 'pt-1'}`}>
            <span className={`font-bold text-white ${isMobile ? 'text-lg' : 'text-xl'}`}>
              ${product.price.toFixed(2)}
            </span>
            {product.discount && product.discount > 0 && (
              <span className={`font-semibold text-zinc-500 line-through ${
                isMobile ? 'text-xs' : 'text-sm'
              }`}>
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard