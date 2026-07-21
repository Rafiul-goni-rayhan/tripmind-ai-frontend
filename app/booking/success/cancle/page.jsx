"use client";

import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BookingCancelPage() {
  const router = useRouter();

  return (
    <main>
      <Navbar />
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
        <XCircle className="mb-4 h-14 w-14 text-amber-500" />
        <h1 className="mb-2 text-xl font-bold text-slate-900">Payment বাতিল হয়েছে</h1>
        <p className="mb-6 text-sm text-slate-500">
          তোমার booking এখনো pending আছে। Dashboard থেকে আবার payment করতে পারো।
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
        >
          Go to Dashboard
        </button>
      </div>
      <Footer />
    </main>
  );
}