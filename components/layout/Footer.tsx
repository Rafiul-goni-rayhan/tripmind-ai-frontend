import Link from "next/link";
import { Plane, Globe, AtSign, Link2, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">TripMind AI</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              AI-powered trip planning platform helping you discover and book your perfect
              adventure across Bangladesh.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-teal-600 hover:text-white">
                <Globe className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-teal-600 hover:text-white">
                <AtSign className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-teal-600 hover:text-white">
                <Link2 className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="text-slate-400 hover:text-teal-400">Home</Link></li>
              <li><Link href="/explore" className="text-slate-400 hover:text-teal-400">Explore Trips</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-teal-400">About Us</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-teal-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Account</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/login" className="text-slate-400 hover:text-teal-400">Login</Link></li>
              <li><Link href="/register" className="text-slate-400 hover:text-teal-400">Register</Link></li>
              <li><Link href="/trips/add" className="text-slate-400 hover:text-teal-400">Add a Trip</Link></li>
              <li><Link href="/trips/manage" className="text-slate-400 hover:text-teal-400">Manage Trips</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <span>Gulshan Avenue, Dhaka 1212, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-teal-400" />
                <a href="tel:+8801700000000" className="hover:text-teal-400">+880 1700-000000</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-teal-400" />
                <a href="mailto:support@tripmind.ai" className="hover:text-teal-400">support@tripmind.ai</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} TripMind AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}