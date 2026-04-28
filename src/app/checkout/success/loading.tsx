const Loading = () => {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
     
      <div className="text-center">
        {/* Spinner Option
        <div className="spinner w-16 h-16 rounded-full border-4 border-zinc-700 border-t-blue-500 mb-4"></div> */}
        
        {/* Loading Text */}
        <p className="text-zinc-400 text-lg tracking-widest font-light">
          Loading
          <span className="inline-block">
            <span className="dot inline-block w-1 h-1 bg-blue-500 rounded-full mx-1" style={{ animationDelay: '0s' }}>.</span>
            <span className="dot inline-block w-1 h-1 bg-blue-500 rounded-full mx-1" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="dot inline-block w-1 h-1 bg-blue-500 rounded-full mx-1" style={{ animationDelay: '0.4s' }}>.</span>
          </span>
        </p>
      </div>
    </div>
  )
}

export default Loading