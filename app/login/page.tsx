"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Plane, Loader2 } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      const message = "ইমেইল ও পাসওয়ার্ড দুটোই দিতে হবে।";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    const { error: signInError } = await signIn.email({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      const message = signInError.message || "লগইন ব্যর্থ হয়েছে। তথ্য যাচাই করো।";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("সফলভাবে লগইন হয়েছে!", "Welcome back");
    router.push("/dashboard");
  };

  const handleDemoLogin = async () => {
    setError("");
    setLoading(true);
    const { error: signInError } = await signIn.email({
      email: "demo@tripmind.ai",
      password: "demo12345",
    });
    setLoading(false);

    if (signInError) {
      const message = "Demo account পাওয়া যায়নি। প্রথমে register করে demo account বানাও।";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("Demo login সফল হয়েছে!", "Demo account");
    router.push("/dashboard");
  };

 const handleGoogleLogin = async () => {
    const currentOrigin = window.location.origin;
    await signIn.social({
      provider: "google",
      callbackURL: `https://tripmind-ai-frontend.vercel.app/dashboard`,
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500">Login to continue to TripMind AI</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="••••••••"
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
            Login
          </button>
        </form>

        {/* <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="mt-3 w-full rounded-xl border border-teal-200 bg-teal-50 py-2.5 text-sm font-semibold text-teal-700 hover:bg-teal-100 disabled:opacity-60"
        >
          Try Demo Login
        </button> */}

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-teal-600 hover:underline">
            Register
          </Link>
        </p>
        </div>
    </main>
  );
}