"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Star, Calendar, Users, Clock, Check, X } from "lucide-react";
import { fetchTripById } from "@/lib/api";
import { useToast } from "@/components/providers/ToastProvider";
import { useSession } from "@/lib/auth-client";
import Navbar from "@/components/layout/Navbar";
import TripCard from "@/components/trips/TripCard";
import Footer from "@/components/layout/Footer";
import BookingModal from "@/components/trips/BookingModal";


export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, isPending } = useSession();
  const id = params.id as string;
const [showBooking, setShowBooking] = useState(false);



  const { data, isLoading, isError } = useQuery({
    queryKey: ["trip", id],
    queryFn: () => fetchTripById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <main>
        <Navbar />
        <div className="mx-auto max-w-5xl px-4 py-12 text-center text-sm text-slate-500">
          Loading trip details...
        </div>
      </main>
    );
  }

  if (isError || !data?.data) {
    return (
      <main>
        <Navbar />
        <div className="mx-auto max-w-5xl px-4 py-12 text-center text-sm text-red-500">
          ট্রিপ খুঁজে পাওয়া যায়নি।
        </div>
      </main>
    );
  }

  const trip = data.data;
  const related = data.related || [];

  const formattedDate = new Date(trip.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleBooking = () => {
    if (isPending) {
      toast.info("অনুগ্রহ করে একটু অপেক্ষা করুন...");
      return;
    }

    if (!session?.user) {
      toast.error("Booking করার আগে লগইন করুন।");
      router.push("/login");
      return;
    }

    toast.success("Booking অনুরোধ সফলভাবে পাঠানো হয়েছে!", "Booking Confirmed");
  };

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
        {/* Image Gallery */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <img
              src={trip.images[0] || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"}
              alt={trip.title}
              className="h-72 w-full rounded-2xl object-cover sm:h-96"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
            {(trip.images.slice(1, 3).length > 0
              ? trip.images.slice(1, 3)
              : [trip.images[0], trip.images[0]]
            ).map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                alt={`${trip.title} ${i + 2}`}
                className="h-32 w-full rounded-2xl object-cover sm:h-[186px]"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Main content */}
          <div className="lg:col-span-2">
            <span className="mb-2 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-medium capitalize text-teal-700">
              {trip.category}
            </span>

            <h1 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
              {trip.title}
            </h1>

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {trip.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-slate-700">{trip.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Overview */}
            <section className="mb-8">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Overview</h2>
              <p className="text-sm leading-relaxed text-slate-600">{trip.fullDescription}</p>
            </section>

            {/* Key Info */}
            <section className="mb-8">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Key Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-3">
                  <Clock className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-slate-400">Duration</p>
                    <p className="text-sm font-medium text-slate-700">{trip.duration || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-3">
                  <Users className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-slate-400">Group Size</p>
                    <p className="text-sm font-medium text-slate-700">{trip.groupSize || "N/A"}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Included / Excluded */}
            <section className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-900">Included</h3>
                <ul className="space-y-2">
                  {trip.included.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 shrink-0 text-teal-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-900">Not Included</h3>
                <ul className="space-y-2">
                  {trip.excluded.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <X className="h-4 w-4 shrink-0 text-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Right: Booking card */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-sm text-slate-400">Starting from</p>
              <p className="mb-4 text-3xl font-bold text-teal-600">
                ৳{trip.price.toLocaleString()}
                <span className="text-sm font-normal text-slate-400"> /person</span>
              </p>
              <button
                onClick={() => setShowBooking(true)}
                className="w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700"
              >
                Book Now
              </button>
              <p className="mt-3 text-center text-xs text-slate-400">
                Free cancellation up to 48 hours before
              </p>
            </div>
          </div>
        </div>

        {/* Related Trips */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Related Trips</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((relatedTrip: any) => (
                <TripCard key={relatedTrip._id} trip={relatedTrip} />
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer/>
       {showBooking && (
        <BookingModal trip={trip} onClose={() => setShowBooking(false)} />
      )}
    </main>
  );
}