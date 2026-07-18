"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { fetchTrips } from "@/lib/api";
import TripCard from "@/components/trips/TripCard";
import TripCardSkeleton from "@/components/trips/TripCardSkeleton";

export default function PopularDestinations() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["popularTrips"],
    queryFn: () => fetchTrips({ sort: "rating", limit: 4 }),
  });

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-2 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
              Top Rated
            </span>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Popular Destinations
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Handpicked trips loved by our travelers.
            </p>
          </div>
          <Link
            href="/explore"
            className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:underline"
          >
            View All Trips
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isError && (
          <p className="text-center text-sm text-red-500">
            ডেটা লোড করতে সমস্যা হয়েছে।
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => <TripCardSkeleton key={i} />)}

          {!isLoading &&
            data?.data.map((trip) => <TripCard key={trip._id} trip={trip} />)}
        </div>
      </div>
    </section>
  );
}