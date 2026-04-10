'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

const SLIDER_DATA = [
  {
    image: "https://mivqdvmsqufpcgemrgpf.supabase.co/storage/v1/object/public/store-bucket/ps5%20image.png",
    title: "PlayStation 5 Pro",
    description: "Experience the power of next generation gaming with ultra-high speed SSD and deeper immersion.",
    link: "/shop/gaming"
  },
  {
    image: "https://mivqdvmsqufpcgemrgpf.supabase.co/storage/v1/object/public/store-bucket/macbook.png",
    title: "MacBook Pro 2025",
    description: "Built for the pro. Featuring the latest M4 chip architecture for unprecedented performance and battery life.",
    link: "/shop/laptops"
  },
  {
    image: "https://mivqdvmsqufpcgemrgpf.supabase.co/storage/v1/object/public/store-bucket/xbox.png",
    title: "Xbox Series X",
    description: "The fastest, most powerful Xbox ever. Elevate your play with 12 teraflops of raw graphic processing power.",
    link: "/shop/gaming"
  }
];

const HeaderSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback((index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      container.scrollTo({
        left: container.offsetWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % SLIDER_DATA.length;
      scrollToIndex(nextIndex);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex, scrollToIndex]);

  const handleManualScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const newIndex = Math.round(container.scrollLeft / container.offsetWidth);
      if (newIndex !== currentIndex) setCurrentIndex(newIndex);
    }
  };

  return (
    <section className="relative w-full bg-black text-white pt-24 overflow-hidden">
      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        onScroll={handleManualScroll}
        className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-container scroll-smooth"
      >
        {SLIDER_DATA.map((item, index) => (
          <div 
            key={item.title} 
            className="relative w-full shrink-0 h-[60vh] md:h-[50vh] flex flex-col md:flex-row items-center justify-between snap-center px-[clamp(1.25rem,5vw,5rem)]"
          >
            {/* MOBILE ONLY: Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/50 z-10 md:hidden" />

            {/* Text Content */}
            <div className="relative flex flex-col justify-center gap-y-6 md:gap-y-8 max-w-full md:max-w-[50%] z-20 mt-auto mb-20 md:my-auto text-center md:text-left items-center md:items-start">
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                {item.title}
              </h1>
              <p className="text-gray-300 md:text-gray-400 text-base md:text-lg leading-relaxed max-w-md">
                {item.description}
              </p>
              
              <Link 
                href={item.link} 
                className="bg-white text-black px-10 py-4 rounded-full w-max font-bold hover:bg-gray-200 transition-all active:scale-95 text-sm"
              >
                Shop Now
              </Link>
            </div>

            {/* Image Container */}
            <div className="absolute inset-0 md:relative md:inset-auto w-full md:w-[45%] h-full z-0 md:z-10">
              <Image 
                src={item.image} 
                fill 
                alt={item.title} 
                priority={index === 0}
                // Opacity 0.6 on mobile so text pops, full opacity on desktop
                className="object-contain md:object-contain opacity-60 md:opacity-100 transition-opacity" 
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ABSOLUTE Animated Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex justify-center gap-3">
        {SLIDER_DATA.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`transition-all duration-500 h-1.5 rounded-full ${
              currentIndex === i ? "w-10 bg-white" : "w-2.5 bg-gray-500/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeaderSlider;