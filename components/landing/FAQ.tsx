"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does the AI recommendation engine work?",
    answer:
      "You share your budget, interests, and preferred trip category, and our AI analyzes all available trips to suggest the best matches for you. You can regenerate recommendations anytime with different preferences.",
  },
  {
    question: "Is the AI chat assistant available 24/7?",
    answer:
      "Yes, our AI travel assistant is available anytime you're logged in. It remembers your conversation history and can help with trip questions, navigation, and travel planning advice.",
  },
  {
    question: "Do I need an account to browse trips?",
    answer:
      "No, you can explore and view trip details without an account. However, you'll need to log in to add your own trips, save preferences, or use the AI chat assistant.",
  },
  {
    question: "Can I cancel or modify a booking?",
    answer:
      "Most trips offer free cancellation up to 48 hours before the start date. Specific cancellation policies are listed on each trip's details page.",
  },
  {
    question: "How do I list my own trip package?",
    answer:
      "After logging in, go to your Dashboard and click 'Add Trip'. Fill in the details like title, description, price, and location, then submit — it will appear in the Explore page immediately.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <div className="mb-10 text-center">
        <span className="mb-2 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
          Got Questions?
        </span>
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-slate-900">{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-sm leading-relaxed text-slate-500">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}