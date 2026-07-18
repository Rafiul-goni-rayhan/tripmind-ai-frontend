"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar, Users, Phone, Mail, X, Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { fetchAllBookings, cancelBooking, Booking } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AdminBookingsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session, isPending } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
      return;
    }
    if (!isPending && session?.user && !isAdmin) {
      router.push("/dashboard");
    }
  }, [isPending, session, isAdmin, router]);

  const { data, isLoading } = useQuery({
    queryKey: ["allBookings"],
    queryFn: fetchAllBookings,
    enabled: isAdmin,
  });

  const handleCancel = async (id: string) => {
    if (!confirm("তুমি কি নিশ্চিত এই booking cancel করতে চাও?")) return;

    setCancellingId(id);
    try {
      await cancelBooking(id);
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
    } catch (err) {
      console.error(err);
    } finally {
      setCancellingId(null);
    }
  };

  if (isPending || !session?.user || !isAdmin) {
    return (
      <main>
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 py-12 text-center text-sm text-slate-500">
          Loading...
        </div>
      </main>
    );
  }

  const bookings: Booking[] = data?.data || [];
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");
  const totalGuests = confirmedBookings.reduce((sum, b) => sum + b.travelers, 0);
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <h1 className="mb-1 text-2xl font-bold text-slate-900">All Bookings</h1>
        <p className="mb-6 text-sm text-slate-500">
          Overview of every booking made across the platform.
        </p>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-400">Total Bookings</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{bookings.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-400">Confirmed Bookings</p>
            <p className="mt-1 text-2xl font-bold text-teal-600">{confirmedBookings.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-400">Total Guests</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{totalGuests}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-400">Total Revenue</p>
            <p className="mt-1 text-2xl font-bold text-amber-600">
              ৳{totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        {isLoading && (
          <p className="py-8 text-center text-sm text-slate-500">Loading bookings...</p>
        )}

        {!isLoading && bookings.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-500">এখনো কোনো booking হয়নি।</p>
        )}

        {!isLoading && bookings.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Trip</th>
                  <th className="px-4 py-3">Traveler</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Guests</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-slate-100 last:border-none">
                    <td className="px-4 py-3">
                      <p className="line-clamp-1 font-medium text-slate-900">
                        {booking.tripId?.title || "Trip removed"}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-700">{booking.userName}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-400">
                        <Mail className="h-3 w-3" />
                        {booking.userEmail}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-slate-400">
                        <Phone className="h-3 w-3" />
                        {booking.contactPhone}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(booking.travelDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {booking.travelers}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-teal-600">
                      ৳{booking.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-teal-50 text-teal-700"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {booking.status === "confirmed" ? "Confirmed" : "Cancelled"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}