"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Sparkles } from "lucide-react";

const popularSearches = ["Cox's Bazar", "Sylhet", "Bandarban", "Sundarbans"];

export default function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    const query = destination.trim();
    if (query) {
      router.push(`/explore?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/explore");
    }
  };

  const handleQuickSearch = (term: string) => {
    setDestination(term);
    router.push(`/explore?q=${encodeURIComponent(term)}`);
  };

  return (
    <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-slate-800 px-4">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur">
          <Sparkles className="h-4 w-4 text-amber-300" />
          AI-Powered Trip Planning
        </div>

        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Let AI Plan Your Next
          <span className="block text-amber-300">Perfect Adventure</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm text-teal-50 sm:text-base">
          Discover personalized trip recommendations, chat with our AI travel
          assistant, and explore hundreds of curated destinations.
        </p>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-2xl sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 px-3">
            <MapPin className="h-5 w-5 shrink-0 text-slate-400" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Where do you want to go?"
              className="w-full border-none bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="hidden items-center gap-2 border-l border-slate-200 px-3 sm:flex">
            <Calendar className="h-5 w-5 shrink-0 text-slate-400" />
            <span className="text-sm text-slate-400">Any date</span>
          </div>

          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-teal-100">Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => handleQuickSearch(term)}
              className="rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}