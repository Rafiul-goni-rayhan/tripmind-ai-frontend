"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useToast } from "@/components/providers/ToastProvider";
import { createTrip } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const categories = ["beach", "mountain", "city", "adventure", "cultural"];

export default function AddTripPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, isPending } = useSession();

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    date: "",
    location: "",
    category: "beach",
    duration: "",
    groupSize: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
      return;
    }
    if (!isPending && session?.user && (session.user as any).role !== "admin") {
      router.push("/dashboard");
    }
  }, [isPending, session, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.shortDescription || !form.fullDescription || !form.price || !form.date || !form.location) {
      const message = "সব প্রয়োজনীয় ফিল্ড পূরণ করো।";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    try {
      await createTrip({
        title: form.title,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        price: Number(form.price),
        date: form.date as any,
        location: form.location,
        category: form.category as any,
        duration: form.duration,
        groupSize: form.groupSize,
        images: form.imageUrl ? [form.imageUrl] : [],
      });
      toast.success("Trip সফলভাবে তৈরি হয়েছে!", "Trip Created");
      router.push("/trips/manage");
    } catch (err: any) {
      const message = err.message || "Trip তৈরি করতে সমস্যা হয়েছে।";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

 if (isPending || !session?.user || (session.user as any).role !== "admin") {
    return (
      <main>
        <Navbar />
        <div className="mx-auto max-w-3xl px-4 py-12 text-center text-sm text-slate-500">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Add a New Trip</h1>
        <p className="mb-6 text-sm text-slate-500">
          Fill in the details below to publish a new trip package.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Cox's Bazar Beach Escape"
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Short Description *</label>
            <input
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              placeholder="A one-line summary (max 200 characters)"
              maxLength={200}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Full Description *</label>
            <textarea
              name="fullDescription"
              value={form.fullDescription}
              onChange={handleChange}
              placeholder="Detailed description of the trip..."
              rows={4}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Price (৳) *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="8500"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Date *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Location *</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Cox's Bazar, Bangladesh"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm capitalize outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Duration</label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="e.g. 3 Days 2 Nights"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Group Size</label>
              <input
                name="groupSize"
                value={form.groupSize}
                onChange={handleChange}
                placeholder="e.g. 2-15 people"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Image URL (optional)</label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Submit Trip
          </button>
        </form>
      </div>
      <Footer/>
    </main>
  );
}