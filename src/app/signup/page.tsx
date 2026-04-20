"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  Timer,
} from "lucide-react";
import { checkExistingEmail, startSignup, verifyOTP } from "./actions";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "otp">("form");
  const [userEmail, setUserEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInitialSignup = async (formDataInput: FormData) => {
    setError(null);
    setLoading(true);
    const email = formDataInput.get("email") as string;
    const password = formDataInput.get("password") as string;

    // Standard Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters, with a letter and a number.",
      );
      setLoading(false);
      return;
    }

    try {
      const { exists } = await checkExistingEmail(email);

      if (exists) {
        toast.dismissAll();
        setError("This email is already registered");
        toast.custom(
          (t) => (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="font-semibold text-red-400">
                This email is already registered
              </p>
              <p className="text-sm text-red-300">
                You can continue or switch to the login page.
              </p>
            </div>
          ),
          {
            duration: 5000,
          },
        );
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Email check failed:", error);
      setError("Unable to verify email availability.");
      setLoading(false);
      return;
    }

    try {
      const result = await startSignup(formDataInput);
      if (result?.success) {
        setUserEmail(email);
        setFormData(formDataInput);
        setStep("otp");
        setTimeLeft(120);
        toast.success("OTP sent to your email");
      } else if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (otpValue.length !== 8) return;

    setLoading(true);
    setError(null);

    try {
      const result = await verifyOTP(userEmail, otpValue);

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else if (result?.success) {
        setTimeLeft(0);
        toast.success("Welcome to the shop!");
        window.location.href = "/account";
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timeLeft > 0) {
      setError(
        `Please wait ${formatTime(timeLeft)} before requesting another code.`,
      );
      return;
    }

    if (!formData) {
      setError("Unable to resend OTP. Please go back and try again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await startSignup(formData);
      if (result?.success) {
        setTimeLeft(120);
        setOtpValue("");
        toast.success("New OTP sent to your email");
      } else {
        setError(result?.error || "Failed to resend OTP");
      }
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md">
        {step === "form" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-white tracking-tight mb-2 uppercase">
                Start Shopping
              </h1>
              <p className="text-zinc-500">
                Create your account to get started
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form action={handleInitialSignup} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-zinc-600 group-focus-within:text-amber-500 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="block w-full pl-10 pr-3 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-zinc-600 group-focus-within:text-amber-500 transition-colors" />
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-amber-500/10 mt-8"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  "CREATE ACCOUNT"
                )}
              </button>
            </form>
          </div>
        )}

        {step === "otp" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-500/10 rounded-2xl mb-4 border border-amber-500/20">
                <ShieldCheck className="w-7 h-7 text-amber-500" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tight">
                Security Code
              </h1>
              <p className="text-zinc-500 text-sm text-balance">
                Enter the 8-digit code sent to <br />
                <span className="text-white font-medium">{userEmail}</span>
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <div className="space-y-6">
              <input
                type="text"
                maxLength={8}
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                placeholder="00000000"
                className="w-full text-center text-3xl tracking-[0.3em] font-mono py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all placeholder:text-zinc-600"
              />

              <div className="flex items-center justify-center gap-2 text-zinc-600 text-[10px] uppercase tracking-widest font-bold">
                <Timer className="w-3 h-3" />
                {timeLeft > 0
                  ? `Wait ${formatTime(timeLeft)} before requesting another OTP`
                  : "Ready for new OTP"}
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleVerify}
                  disabled={loading || otpValue.length !== 8}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-bold py-3.5 rounded-xl transition-all"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin mx-auto" />
                  ) : (
                    "CONFIRM OTP"
                  )}
                </button>

                <div className="flex mt-10">
                  <button
                  onClick={handleResendOTP}
                  disabled={loading || timeLeft > 0}
                  className="w-full flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-white  disabled:text-zinc-700 transition-colors uppercase tracking-widest font-semibold"
                >
                  {loading ? (
                    <div className="h-4 w-4 border-2 border-zinc-500/30 border-t-zinc-500 rounded-full animate-spin" />
                  ) : (
                    <>
                      Resend Code
                    </>
                  )}
                </button>

                <button
                  onClick={() => setStep("form")}
                  className="w-full flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-widest font-semibold"
                >
                  <ArrowLeft className="w-3 h-3" /> Back to details
                </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-zinc-900 text-center flex items-center justify-center gap-4">
          <div className="text-xl font-black tracking-tighter text-white uppercase">
            Cassius<span className="text-red-500">.</span>
          </div>
          <div className="h-4 w-[1px] bg-zinc-800" />
          <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
            Secure Checkout
          </p>
        </div>
      </div>
    </div>
  );
}