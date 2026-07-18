import Link from "next/link";
import { Star, MapPin, Calendar } from "lucide-react";
import { Trip } from "@/lib/api";

export default function TripCard({ trip }: { trip: Trip }) {
  const formattedDate = new Date(trip.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={trip.images[0] || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"}
          alt={trip.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium capitalize text-slate-700">
          {trip.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="h-3.5 w-3.5" />
          <span>{trip.location}</span>
        </div>

        <h3 className="mb-1 line-clamp-1 text-base font-semibold text-slate-900">
          {trip.title}
        </h3>

        <p className="mb-3 line-clamp-2 flex-1 text-sm text-slate-500">
          {trip.shortDescription}
        </p>

        <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-slate-700">{trip.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
          <div>
            <span className="text-lg font-bold text-teal-600">৳{trip.price.toLocaleString()}</span>
            <span className="text-xs text-slate-400"> /person</span>
          </div>
          <Link
            href={`/trips/${trip._id}`}
            className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}