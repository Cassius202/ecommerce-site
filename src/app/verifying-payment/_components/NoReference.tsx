import Link from 'next/link'

const NoReference = () => {
  return (
    <div className="bg-zinc-950 h-svh w-full flex flex-col justify-center items-center text-center">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Oops!</h1>
        <p className="text-zinc-400 mb-6">No reference found. No payment has been processed.</p>
        <Link 
          href="/" 
          className="inline-block bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-zinc-200 transition-all active:scale-95"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NoReference