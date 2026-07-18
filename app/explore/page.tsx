"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";
import { fetchTrips } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import TripCard from "@/components/trips/TripCard";
import TripCardSkeleton from "@/components/trips/TripCardSkeleton";
import Footer from "@/components/layout/Footer";
const categories = ["all", "beach", "mountain", "city", "adventure", "cultural"];

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialQuery);
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["trips", search, category, maxPrice, sort, page],
    queryFn: () =>
      fetchTrips({
        q: search,
        category: category === "all" ? undefined : category,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sort,
        page,
        limit: 8,
      }),
  });

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Explore Trips</h1>
        <p className="mb-6 text-sm text-slate-500">
          Find your next destination from our curated collection.
        </p>

        {/* Search + Filters */}
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name or location..."
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm capitalize outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="capitalize">
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setPage(1);
            }}
            placeholder="Max price (৳)"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none md:w-36"
          />

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-slate-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border-none bg-transparent text-sm outline-none"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {isError && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
            ডেটা লোড করতে সমস্যা হয়েছে। Backend সার্ভার চালু আছে কিনা চেক করো।
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <TripCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && !isError && data && (
          <>
            {data.data.length === 0 ? (
              <p className="py-12 text-center text-sm text-slate-500">
                কোনো ট্রিপ পাওয়া যায়নি। অন্য filter দিয়ে চেষ্টা করো।
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data.data.map((trip) => (
                  <TripCard key={trip._id} trip={trip} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {data.pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-sm text-slate-500">
                  Page {data.pagination.page} of {data.pagination.totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(data.pagination.totalPages, p + 1))
                  }
                  disabled={page === data.pagination.totalPages}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
          <Footer />
    </main>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading...</div>}>
      <ExploreContent />
    </Suspense>
  );
}