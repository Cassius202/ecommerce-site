import Link from 'next/link'

const NotfoundButtons = () => {
  return (
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

  )
}

export default NotfoundButtons