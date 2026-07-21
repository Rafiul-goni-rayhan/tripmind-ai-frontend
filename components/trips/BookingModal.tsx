"use client";

import { useState } from "react";
import { X, Loader2, CheckCircle2, Calendar, Users, Phone } from "lucide-react";
import { createBooking, Trip,createCheckoutSession } from "@/lib/api";
export default function BookingModal({
  trip,
  onClose,
}: {
  trip: Trip;
  onClose: () => void;
}) {
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState("1");
  const [contactPhone, setContactPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const totalPrice = trip.price * Number(travelers || 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!travelDate || !travelers || !contactPhone) {
      setError("সব ফিল্ড পূরণ করতে হবে।");
      return;
    }

    setLoading(true);
    try {
      const bookingRes = await createBooking({
        tripId: trip._id,
        travelDate,
        travelers: Number(travelers),
        contactPhone,
      });

      const bookingId = bookingRes.data._id;
      const checkoutRes = await createCheckoutSession(bookingId);
      window.location.href = checkoutRes.url;
    } catch (err: any) {
      setError(err.message || "সমস্যা হয়েছে, আবার চেষ্টা করো।");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {success ? "Booking Confirmed" : "Book This Trip"}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 className="mb-3 h-12 w-12 text-teal-600" />
            <p className="mb-1 font-medium text-slate-900">তোমার booking সফল হয়েছে!</p>
            <p className="mb-5 text-sm text-slate-500">
              বিস্তারিত তোমার Dashboard এ "My Bookings" এ দেখা যাবে।
            </p>
            <button
              onClick={onClose}
              className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-slate-500">{trip.title}</p>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
            )}

            <div>
              <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <Calendar className="h-4 w-4" />
                Travel Date
              </label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <Users className="h-4 w-4" />
                Number of Travelers
              </label>
              <input
                type="number"
                min={1}
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <Phone className="h-4 w-4" />
                Contact Phone
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+880 1XXX-XXXXXX"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl bg-teal-50 px-4 py-3">
              <span className="text-sm text-slate-600">Total Price</span>
              <span className="text-lg font-bold text-teal-600">
                ৳{totalPrice.toLocaleString()}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Confirm Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
}