"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, Eye, PlusCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { useSession } from "@/lib/auth-client";
import { fetchTripsByUser, deleteTrip, Trip } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ManageTripsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: session, isPending } = useSession();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  const userId = session?.user?.id;

  const { data, isLoading } = useQuery({
    queryKey: ["userTrips", userId],
    queryFn: () => fetchTripsByUser(userId as string),
    enabled: !!userId,
  });

  const handleDelete = async (id: string) => {
    if (!confirm("তুমি কি নিশ্চিত এই trip টি delete করতে চাও?")) return;

    setDeletingId(id);
    setError("");
    try {
      await deleteTrip(id);
      queryClient.invalidateQueries({ queryKey: ["userTrips", userId] });
      toast.success("Trip সফলভাবে মুছে ফেলা হয়েছে।", "Deleted");
    } catch (err: any) {
      const message = err.message || "Delete করতে সমস্যা হয়েছে।";
      setError(message);
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  if (isPending || !session?.user) {
    return (
      <main>
        <Navbar />
        <div className="mx-auto max-w-5xl px-4 py-12 text-center text-sm text-slate-500">
          Loading...
        </div>
      </main>
    );
  }

  const trips: Trip[] = data?.data || [];

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Trips</h1>
            <p className="text-sm text-slate-500">Manage the trips you&apos;ve published.</p>
          </div>
          <Link
            href="/trips/add"
            className="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
          >
            <PlusCircle className="h-4 w-4" />
            Add Trip
          </Link>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        {isLoading && (
          <div className="py-12 text-center text-sm text-slate-500">Loading your trips...</div>
        )}

        {!isLoading && trips.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
            <p className="mb-4 text-sm text-slate-500">তুমি এখনো কোনো trip যোগ করোনি।</p>
            <Link
              href="/trips/add"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
            >
              <PlusCircle className="h-4 w-4" />
              Add Your First Trip
            </Link>
          </div>
        )}

        {!isLoading && trips.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Trip</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Category</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Price</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <tr key={trip._id} className="border-b border-slate-100 last:border-none">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={trip.images[0] || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"}
                          alt={trip.title}
                          className="h-10 w-10 shrink-0 rounded-lg object-cover"
                        />
                        <div>
                          <p className="line-clamp-1 font-medium text-slate-900">{trip.title}</p>
                          <p className="text-xs text-slate-400">{trip.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 capitalize text-slate-600 sm:table-cell">
                      {trip.category}
                    </td>
                    <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">
                      ৳{trip.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/trips/${trip._id}`}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(trip._id)}
                          disabled={deletingId === trip._id}
                          className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50 disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === trip._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer/>
    </main>
  );
}