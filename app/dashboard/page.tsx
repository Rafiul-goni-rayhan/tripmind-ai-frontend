"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  PlusCircle,
  ListChecks,
  Compass,
  Sparkles,
  Calendar,
  Users,
  Wallet,
  ClipboardList,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { fetchAllBookings, Booking } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RecommendationSection from "@/components/trips/RecommendationSection";
import MyBookings from "@/components/trips/MyBookings";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  const { data: bookingsData, isLoading: bookingsLoading } = useQuery({
    queryKey: ["allBookings"],
    queryFn: fetchAllBookings,
    enabled: isAdmin,
  });

  if (isPending) {
    return (
      <main>
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-12 text-center text-sm text-slate-500">
          Loading...
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return null;
  }

  const firstName = session.user.name?.split(" ")[0] || "Traveler";

  // ---------- ADMIN DASHBOARD ----------
  if (isAdmin) {
    const bookings: Booking[] = bookingsData?.data || [];
    const confirmedBookings = bookings.filter((b) => b.status === "confirmed");
    const totalGuests = confirmedBookings.reduce((sum, b) => sum + b.travelers, 0);
    const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0);
    const recentBookings = bookings.slice(0, 5);

    return (
      <main>
        <Navbar />

        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <h1 className="mb-1 text-2xl font-bold text-slate-900">
            Admin Dashboard — Welcome, {firstName} 👋
          </h1>
          <p className="mb-8 text-sm text-slate-500">
            Overview of platform activity and bookings.
          </p>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                <ClipboardList className="h-4.5 w-4.5 text-teal-600" />
              </div>
              <p className="text-xs text-slate-400">Total Bookings</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{bookings.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                <Calendar className="h-4.5 w-4.5 text-teal-600" />
              </div>
              <p className="text-xs text-slate-400">Confirmed Bookings</p>
              <p className="mt-1 text-2xl font-bold text-teal-600">
                {confirmedBookings.length}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                <Users className="h-4.5 w-4.5 text-teal-600" />
              </div>
              <p className="text-xs text-slate-400">Total Guests</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{totalGuests}</p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100">
                <Wallet className="h-4.5 w-4.5 text-amber-600" />
              </div>
              <p className="text-xs text-slate-500">Total Revenue</p>
              <p className="mt-1 text-2xl font-bold text-amber-600">
                ৳{totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Link
              href="/trips/add"
              className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                <PlusCircle className="h-5 w-5 text-teal-600" />
              </div>
              <h3 className="mb-1 font-semibold text-slate-900">Add a Trip</h3>
              <p className="text-sm text-slate-500">Create and publish a new trip package.</p>
            </Link>

            <Link
              href="/admin/bookings"
              className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                <ClipboardList className="h-5 w-5 text-teal-600" />
              </div>
              <h3 className="mb-1 font-semibold text-slate-900">All Bookings</h3>
              <p className="text-sm text-slate-500">View and manage every booking.</p>
            </Link>

            <Link
              href="/trips/manage"
              className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                <ListChecks className="h-5 w-5 text-teal-600" />
              </div>
              <h3 className="mb-1 font-semibold text-slate-900">Manage Trips</h3>
              <p className="text-sm text-slate-500">Edit or remove published trips.</p>
            </Link>
          </div>

          {/* Recent Bookings */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Recent Bookings</h2>
              <Link
                href="/admin/bookings"
                className="text-sm font-medium text-teal-600 hover:underline"
              >
                View All →
              </Link>
            </div>

            {bookingsLoading && (
              <p className="text-sm text-slate-500">Loading bookings...</p>
            )}

            {!bookingsLoading && recentBookings.length === 0 && (
              <p className="text-sm text-slate-500">এখনো কোনো booking হয়নি।</p>
            )}

            {!bookingsLoading && recentBookings.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Trip</th>
                      <th className="px-4 py-3">Traveler</th>
                      <th className="px-4 py-3">Guests</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking._id} className="border-b border-slate-100 last:border-none">
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {booking.tripId?.title || "Trip removed"}
                        </td>
                        <td className="px-4 py-3 text-slate-600">{booking.userName}</td>
                        <td className="px-4 py-3 text-slate-600">{booking.travelers}</td>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  // ---------- NORMAL USER DASHBOARD ----------
  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <h1 className="mb-1 text-2xl font-bold text-slate-900">
          Welcome back, {firstName} 👋
        </h1>
        <p className="mb-8 text-sm text-slate-500">
          Here&apos;s what you can do from your dashboard.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/trips/manage"
            className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
              <ListChecks className="h-5 w-5 text-teal-600" />
            </div>
            <h3 className="mb-1 font-semibold text-slate-900">Manage Trips</h3>
            <p className="text-sm text-slate-500">View, edit, or delete your published trips.</p>
          </Link>

          <Link
            href="/explore"
            className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
              <Compass className="h-5 w-5 text-teal-600" />
            </div>
            <h3 className="mb-1 font-semibold text-slate-900">Explore Trips</h3>
            <p className="text-sm text-slate-500">Browse all available destinations.</p>
          </Link>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">My Bookings</h2>
          <MyBookings />
        </div>

        <div className="mt-8">
          <RecommendationSection />
        </div>
      </div>

      <Footer />
    </main>
  );
}