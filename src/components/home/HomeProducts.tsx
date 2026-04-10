'use client'

import { ProductParams } from "@/constants/assets";
import ProductCard from "../product-content/ProductCard";
import { useIsMobile } from "@/hooks/useMediaQuery";

const HomeProducts = ({ products }: { products: ProductParams[] }) => {
  const isMobile = useIsMobile();

  const latestProducts = products.filter((p, idx) => idx <= 8);  

  // Handle empty state
  if (!latestProducts || latestProducts.length === 0) {
    return (
      <section className="py-12 px-4">
        <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-8 text-zinc-100`}>
          Latest Products
        </h1>
        <div className="flex items-center justify-center min-h-75 rounded-lg bg-zinc-900 border border-zinc-800">
          <p className="text-zinc-400 text-center px-4">
            No products available at the moment. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`${isMobile ? 'py-6 px-3' : 'py-12 px-4 sm:px-6 lg:px-8'}`}>
      <h1 
        className={`${
          isMobile 
            ? 'text-2xl font-bold mb-4' 
            : 'text-3xl font-bold mb-8'
        } text-zinc-100`}
      >
        Latest Products
      </h1>
      
      <div 
        className={`grid ${
          isMobile 
            ? 'grid-cols-2 gap-3' 
            : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
        }`}
      >
        {latestProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
}

export default HomeProducts;