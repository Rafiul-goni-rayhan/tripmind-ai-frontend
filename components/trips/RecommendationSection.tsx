"use client";

import { useState } from "react";
import { Sparkles, Loader2, RotateCcw } from "lucide-react";
import { getRecommendations, Trip } from "@/lib/api";
import TripCard from "./TripCard";
import TripCardSkeleton from "./TripCardSkeleton";

const categoryOptions = [
  { value: "", label: "Any" },
  { value: "beach", label: "Beach" },
  { value: "mountain", label: "Mountain" },
  { value: "city", label: "City" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
];

export default function RecommendationSection() {
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState("");
  const [preferredCategory, setPreferredCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState<Trip[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getRecommendations({
        budget: budget ? Number(budget) : undefined,
        interests: interests || undefined,
        preferredCategory: preferredCategory || undefined,
      });
      setRecommendations(res.data || []);
      setHasSearched(true);
    } catch (err: any) {
      setError(err.message || "Recommendation তৈরি করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
          <Sparkles className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">AI Trip Recommendations</h3>
          <p className="text-sm text-slate-600">তোমার পছন্দ অনুযায়ী AI trip suggest করবে।</p>
        </div>
      </div>

      {/* Preference form */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Max budget (৳)"
          className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm outline-none"
        />
        <select
          value={preferredCategory}
          onChange={(e) => setPreferredCategory(e.target.value)}
          className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm outline-none"
        >
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="Interests (e.g. hiking, relaxing)"
          className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm outline-none"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : hasSearched ? (
          <RotateCcw className="h-4 w-4" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        {hasSearched ? "Regenerate" : "Get Recommendations"}
      </button>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      {/* Results */}
      {loading && (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <TripCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && recommendations && recommendations.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((trip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </div>
      )}

      {!loading && hasSearched && recommendations?.length === 0 && (
        <p className="mt-6 text-center text-sm text-slate-500">
          কোনো ম্যাচিং trip পাওয়া যায়নি। অন্য preference দিয়ে চেষ্টা করো।
        </p>
      )}
    </section>
  );
}