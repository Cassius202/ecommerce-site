"use client";

const NewsletterSignup = () => {
  return (
    <div className="mt-2">
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        Get early access to new arrivals, exclusive deals, and tech drops.
      </p>
      <form className="flex items-center gap-2">
        <input
          type="email"
          placeholder="Email address"
          className="flex-1 bg-white/10 border border-white/10 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-full outline-none focus:border-white/30 transition-colors"
        />
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 active:scale-95 transition-all text-white text-sm font-semibold px-5 py-3 rounded-full whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;