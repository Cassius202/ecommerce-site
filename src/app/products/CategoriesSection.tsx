"use client";
import { useRef } from 'react';
import { ProductParams } from '@/constants/assets';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Sub-component for each sliding row
const CategorySection = ({ title, items }: { title: string, items: ProductParams[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const moveDistance = clientWidth * 0.8; // Slide by 80% of view width
      const scrollTo = direction === 'left' ? scrollLeft - moveDistance : scrollLeft + moveDistance;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="group relative">
      {/* Category Header */}
      <div className="flex items-center justify-between px-8 mb-4 bg-white/5 py-1.5">
        <Link href={`/category/${title.toLowerCase()}`}>
          <h2
            className="text-xl font-bold text-white uppercase tracking-tighter">
            {title}<span className="text-blue-500">.</span>
          </h2>
        </Link>
        <Link href={`/category/${title.toLowerCase()}`} className="text-xs font-bold text-zinc-100 hover:text-white transition-colors md:mr-4 bg-orange-500 btn p-1.5">
          SEE ALL
        </Link>
      </div>

      <div className="relative px-6">
        {/* Navigation Buttons - Jumia Style */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-container"
        >
          {items.map((product) => (
            <Link 
              href={`/products/${product.id}`} 
              key={product.id}
              className="min-w-[170px] sm:min-w-[240px] snap-start group/card"
            >
              <div className="relative aspect-square rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden mb-3">
                <Image 
                  src={product.image_url_array[0]} 
                  alt={product.name}
                  fill
                  className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                />
                {product.offer_price && (
                   <div className="absolute top-2 right-2 bg-blue-600 text-[10px] font-black text-white px-2 py-0.5 rounded uppercase">
                     Sale
                   </div>
                )}
              </div>
              <h3 className="text-sm font-medium text-zinc-300 truncate">{product.name}</h3>
              <p className="text-white font-bold">₦{product.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      </div>
    </section>
  );
}

export default CategorySection;