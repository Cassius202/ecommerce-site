'use client'

import { useState } from "react";
import { sendEmail } from "../../utils/actions/email";
import { toast } from "react-hot-toast"; // Recommended for your toasts

const ContactFormPage = () => {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const result = await sendEmail({ email, message });

    if (result.success) {
      toast.success("Message sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-xl space-y-6"
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-stone-50">Contact Us</h1>
          <p className="text-zinc-400 text-sm">Have a question about a product or delivery in Nigeria? Drop us a message.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              placeholder="you@example.com"
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-600/50 transition-all"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Message</label>
            <textarea 
              name="message"
              required
              rows={4}
              placeholder="How can we help?"
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-600/50 transition-all resize-none"
            />
          </div>
        </div>

        <button 
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-700 text-white font-bold py-3 rounded-lg transition-all active:scale-95 flex justify-center items-center"
          type="submit"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </main>
  );
}

export default ContactFormPage;