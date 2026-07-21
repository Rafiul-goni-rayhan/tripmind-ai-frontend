"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { verifyPayment } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setMessage("Invalid session");
      return;
    }

    verifyPayment(sessionId)
      .then(() => setStatus("success"))
      .catch((err) => {
        setStatus("error");
        setMessage(err.message || "Payment verify করা যায়নি");
      });
  }, [sessionId]);

  return (
    <main>
      <Navbar />
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
        {status === "loading" && (
          <>
            <Loader2 className="mb-4 h-12 w-12 animate-spin text-teal-600" />
            <p className="text-slate-600">Payment verify করা হচ্ছে...</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="mb-4 h-14 w-14 text-teal-600" />
            <h1 className="mb-2 text-xl font-bold text-slate-900">Booking Confirmed!</h1>
            <p className="mb-6 text-sm text-slate-500">
              তোমার payment সফল হয়েছে এবং booking confirm হয়ে গেছে।
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Go to Dashboard
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mb-4 h-14 w-14 text-red-500" />
            <h1 className="mb-2 text-xl font-bold text-slate-900">সমস্যা হয়েছে</h1>
            <p className="mb-6 text-sm text-slate-500">{message}</p>
            <button
              onClick={() => router.push("/explore")}
              className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Back to Explore
            </button>
          </>
        )}13
      </div>
      <Footer />
    </main>
  );
}