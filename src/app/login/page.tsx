"use client";

import { useState } from "react";
import { login } from "./actions";
import { Mail, Lock, LogIn, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // 1. Import this

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/";

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setLoading(true); // ✅ Set loading immediately

    const email = formData.get("email") as string;

    // Client-side validation (still runs instantly)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      // Server action - no catch needed here anymore
      await login(formData, redirectTo);
    } catch (err: any) {
      // Only show error if NOT a successful redirect
      if (err.message !== "NEXT_REDIRECT") {
        setError("Login failed. Please check your credentials.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-zinc-500 italic uppercase text-[10px] tracking-[0.3em]">
            Sign in to your account
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Note: use 'action' for the wrapper, or 'onSubmit' for custom control */}
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest ml-1"
            >
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-zinc-600 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="block w-full pl-12 pr-3 py-3.5 bg-zinc-900/30 border border-zinc-800/50 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500/50 transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest ml-1"
            >
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-zinc-600 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="block w-full pl-12 pr-3 py-3.5 bg-zinc-900/30 border border-zinc-800/50 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500/50 transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading} // ✅ Disable during loading
            className={`w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-black py-4 px-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-amber-500/10 mt-8 uppercase tracking-widest text-xs ${
              loading
                ? "opacity-75 cursor-not-allowed bg-amber-500"
                : "hover:bg-amber-600"
            }`}
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Login
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-900">
          <p className="text-center text-[10px] uppercase font-bold tracking-widest text-zinc-600 mb-4">
            {`Don't have an account?`}
          </p>
          <Link href={`/signup?next=${encodeURIComponent(redirectTo)}`}>
            <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-zinc-900 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-500 hover:text-white font-black py-4 px-4 rounded-xl transition-all uppercase tracking-widest text-[10px]">
              Create Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="mt-12 text-center text-zinc-800 flex items-center justify-center grayscale opacity-50">
          <div className="text-xl font-black tracking-tighter inline border-r border-zinc-900 pr-5 mr-5 italic">
            CASSIUS STORES<span className="text-red-500">.</span>
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest">
            Supabase Auth
          </p>
        </div>
      </div>
    </div>
  );
}
