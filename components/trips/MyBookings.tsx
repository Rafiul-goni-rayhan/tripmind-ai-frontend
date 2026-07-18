"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar, Users, Phone, MapPin, X, Loader2 } from "lucide-react";
import { fetchMyBookings, cancelBooking, Booking } from "@/lib/api";

export default function MyBookings() {
  const queryClient = useQueryClient();
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["myBookings"],
    queryFn: fetchMyBookings,
  });

  const bookings: Booking[] = data?.data || [];

  const handleCancel = async (id: string) => {
    if (!confirm("তুমি কি নিশ্চিত এই booking cancel করতে চাও?")) return;

    setCancellingId(id);
    try {
      await cancelBooking(id);
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    } catch (err) {
      console.error(err);
    } finally {
      setCancellingId(null);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading your bookings...</p>;
  }

  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 py-10 text-center">
        <p className="mb-3 text-sm text-slate-500">
          তুমি এখনো কোনো trip book করোনি।
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
        >
          Explore Trips
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => {
        const tripExists = !!booking.tripId?._id;
        const tripImage =
          booking.tripId?.images?.[0] ||
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

        return (
          <div
            key={booking._id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
          >
            {tripExists ? (
              <Link href={`/trips/${booking.tripId._id}`} className="shrink-0">
                <img
                  src={tripImage}
                  alt={booking.tripId?.title || "Trip"}
                  className="h-20 w-full rounded-xl object-cover transition-opacity hover:opacity-90 sm:w-28"
                />
              </Link>
            ) : (
              <img
                src={tripImage}
                alt="Trip"
                className="h-20 w-full rounded-xl object-cover sm:w-28"
              />
            )}

            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between gap-2">
                {tripExists ? (
                  <Link
                    href={`/trips/${booking.tripId._id}`}
                    className="font-semibold text-slate-900 hover:text-teal-600 hover:underline"
                  >
                    {booking.tripId?.title}
                  </Link>
                ) : (
                  <h4 className="font-semibold text-slate-900">
                    Trip no longer available
                  </h4>
                )}
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    booking.status === "confirmed"
                      ? "bg-teal-50 text-teal-700"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {booking.status === "confirmed" ? "Confirmed" : "Cancelled"}
                </span>
              </div>

              {booking.tripId?.location && (
                <div className="mb-2 flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="h-3.5 w-3.5" />
                  {booking.tripId.location}
                </div>
              )}

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(booking.travelDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {booking.travelers} traveler{booking.travelers > 1 ? "s" : ""}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {booking.contactPhone}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-2">
              <span className="text-lg font-bold text-teal-600">
                ৳{booking.totalPrice.toLocaleString()}
              </span>
              {booking.status === "confirmed" && (
                <button
                  onClick={() => handleCancel(booking._id)}
                  disabled={cancellingId === booking._id}
                  className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 disabled:opacity-50"
                >
                  {cancellingId === booking._id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <X className="h-3.5 w-3.5" />
                  )}
                  Cancel
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
