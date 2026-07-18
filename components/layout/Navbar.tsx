"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Plane, User, LogOut } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

const loggedOutLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
];

const loggedInLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/dashboard", label: "Dashboard" },
  // { href: "/trips/manage", label: "My Trips" },
];

const adminLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/trips/add", label: "Add Trip" },
  { href: "/trips/manage", label: "My Trips" },
  { href: "/admin/bookings", label: "All Bookings" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const isLoggedIn = !!session?.user;
  const userName = session?.user?.name || "Guest";
  const isAdmin = (session?.user as any)?.role === "admin";




  const links = isLoggedIn ? (isAdmin ? adminLinks : loggedInLinks) : loggedOutLinks;

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-slate-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">TripMind AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-teal-600" : "text-slate-600 hover:text-teal-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-100" />
          ) : isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <User className="h-4 w-4" />
                <span>{userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-700 hover:text-teal-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-slate-700"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-medium ${
                pathname === link.href ? "text-teal-600" : "text-slate-700"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <LogOut className="h-4 w-4" />
                Logout ({userName})
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-slate-700"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg bg-teal-600 px-4 py-2 text-center text-sm font-medium text-white"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}