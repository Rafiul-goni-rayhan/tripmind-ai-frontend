"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Plane, Loader2 } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      const message = "সব ফিল্ড পূরণ করতে হবে।";
      setError(message);
      toast.error(message);
      return;
    }

    if (password.length < 8) {
      const message = "পাসওয়ার্ড কমপক্ষে ৮ ক্যারেক্টার হতে হবে।";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    const { error: signUpError } = await signUp.email({
      name,
      email,
      password,
    });
    setLoading(false);

    if (signUpError) {
      const message = signUpError.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে।";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("রেজিস্ট্রেশন সফল হয়েছে!", "Welcome");
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Create your account</h1>
          <p className="text-sm text-slate-500">Start planning your next trip with AI</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5">
              <User className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rayhan Ahmed"
                className="w-full border-none bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5">
              <Mail className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-none bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5">
              <Lock className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full border-none bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-teal-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}