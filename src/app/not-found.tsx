import NotfoundButtons from '@/components/notfound-components/Buttons'
import ProductGrid from '@/components/notfound-components/ProductGrid';
import { fetchProducts } from '@/utils/actions/product.action';
import Link from 'next/link';

export default async function NotFound() {

  const products = await fetchProducts();
  return (
    <div className="min-h-screen bg-black flex flex-col items-center relative pt-28 overflow-hidden pb-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-2xl mb-20">
        {/* 404 Number - Reduced Size */}
        <div className="mb-6">
          <div className="inline-block">
            <h1 className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 leading-none tracking-tighter">
              404
            </h1>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-zinc-400 text-base sm:text-lg mb-10 leading-relaxed max-w-md mx-auto">
         {`We couldn't find what you're looking for. The collection may have moved. Let's get you back to discovering amazing products.`}
        </p>

        {/* Buttons Container */}
        <NotfoundButtons />
      </div>

      {/* Suggested Products Grid */}
      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 border-b border-zinc-900 pb-4">
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">
            Suggested for you
          </h3>
          <div className="h-px flex-1 bg-zinc-900 ml-6 mr-6 hidden sm:block"></div>
          <Link href="/shop" className="text-xs font-semibold text-blue-500 hover:text-blue-400 transition-colors">
            BROWSE ALL
          </Link>
        </div>
      </div>

      <ProductGrid products={products} />

      {/* Subtle Branding */}
      <div className="mt-20 text-center opacity-10">
         <span className="text-2xl font-black tracking-tighter text-white uppercase">
            Cassius<span className="text-red-500">.</span>
          </span>
      </div>
    </div>
  )
}