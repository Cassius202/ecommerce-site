import { ProductParams } from "@/constants/assets";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import { ShoppingCart } from "lucide-react";

const ProductGrid = ({ products }: { products: ProductParams[] }) => {
  const selectedProducts = products.filter((p, index) => index < 4);
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
        {selectedProducts.map((product) => {
          const hasDiscount = product.offer_price && product.offer_price < product.price;
          
          return (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`} 
              className="group relative flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-all duration-500 group-hover:border-blue-500/40 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                
                {/* Updated to Next.js Image */}
                <Image
                  src={product.image_url_array[0]}
                  alt={product.name}
                  fill // Use fill for relative aspect-ratio containers
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  priority={false} // Allow lazy loading for grid items
                />

                {hasDiscount && (
                  <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">
                    Sale
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-t from-black/80 to-transparent hidden sm:block">
                   <div className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg flex items-center justify-center gap-2">
                     <ShoppingCart className="w-3.5 h-3.5" />
                     QUICK ADD
                   </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                  {product.brand || product.category}
                </p>
                <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-blue-400 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">
                    ₦{(product.offer_price || product.price).toLocaleString()}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-zinc-600 line-through">
                      ₦{product.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;