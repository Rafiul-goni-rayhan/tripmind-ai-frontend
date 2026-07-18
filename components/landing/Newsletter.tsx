"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Note: এখানে সরাসরি static confirmation দেখাচ্ছি;
    // চাইলে পরে backend এ /api/newsletter route বানিয়ে সত্যিকারের storage যোগ করা যাবে।
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 via-teal-600 to-slate-800 px-6 py-12 text-center md:px-16 md:py-16">
        <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />

        <h2 className="mx-auto max-w-xl text-2xl font-bold text-white md:text-3xl">
          Get Personalized Trip Ideas in Your Inbox
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-teal-50">
          Subscribe for AI-curated destination picks, seasonal deals, and travel tips.
        </p>

        {subscribed ? (
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm text-white backdrop-blur">
            <CheckCircle2 className="h-5 w-5 text-amber-300" />
            Thanks for subscribing! Check your inbox soon.
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 rounded-2xl bg-white p-2 shadow-xl sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-2 px-3">
              <Mail className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-none bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Subscribe
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}