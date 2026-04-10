'use client'

import Link from 'next/link'

export default function NotFound() {
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative pt-28 overflow-hidden pb-60">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-2xl">
        {/* 404 Number - Large & Bold */}
        <div className="mb-8">
          <div className="inline-block">
            <h1 className="text-9xl sm:text-[140px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 leading-none">
              404
            </h1>
          </div>
        </div>

    
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-zinc-400 text-lg sm:text-xl mb-12 leading-relaxed max-w-md mx-auto">
         {` We couldn't find what you're looking for. The page may have been moved or no longer exists. Let's get you back to discovering amazing products.`}
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Home Button */}
          <Link href="/">
            <button className="group relative px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 overflow-hidden w-full sm:w-auto">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 transition-transform duration-300 group-hover:scale-105" />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              
              {/* Text */}
              <span className="relative text-black flex items-center justify-center gap-2">
                ← Back Home
              </span>
            </button>
          </Link>

          {/* Shop Now Button */}
          <Link href="/shop">
            <button className="group relative px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 overflow-hidden w-full sm:w-auto border-2 border-zinc-700 hover:border-blue-500">
              {/* Background */}
              <div className="absolute inset-0 bg-zinc-900/50 group-hover:bg-zinc-800/50 transition-colors duration-300" />
              
              {/* Text */}
              <span className="relative text-zinc-100 group-hover:text-blue-400 transition-colors duration-300 flex items-center justify-center gap-2">
                Continue Shopping →
              </span>
            </button>
          </Link>
        </div>

        {/* Subtle Text */}
        <p className="mt-12 text-zinc-600 text-sm">
          Error Code: <span className="text-zinc-500 font-mono">404_NOT_FOUND</span>
        </p>
      </div>
    </div>
  )
}