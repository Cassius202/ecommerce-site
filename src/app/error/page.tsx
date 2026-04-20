"use client";

import Link from "next/link";
import { AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 mt-5">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 pt-6 text-center shadow-2xl">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>

        {/* Text Content */}
        <h1 className="text-2xl font-bold text-white mb-2">
          Authentication Failed
        </h1>
        <p className="text-zinc-400 mb-8 leading-relaxed">
         {` We couldn't sign you into your account. This could be due to an expired link, 
          incorrect credentials, or a temporary connection issue.`}
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full bg-sky-500 hover:bg-sky-600 text-black font-bold py-3 rounded-lg transition-all duration-200"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Logging In Again
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
        </div>

        {/* Help Footer */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <p className="text-xs text-zinc-500">
            If you continue to have issues, please check if cookies are enabled in your browser or contact support.
          </p>
        </div>
      </div>
    </div>
  );
}