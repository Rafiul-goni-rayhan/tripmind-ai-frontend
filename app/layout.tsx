import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import ChatWidget from "@/components/chat/ChatWidget";

export const metadata: Metadata = {
  title: "TripMind AI - AI-Powered Trip Planning",
  description:
    "Discover personalized trip recommendations and chat with our AI travel assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          <ToastProvider>
            {children}
            <ChatWidget />
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}