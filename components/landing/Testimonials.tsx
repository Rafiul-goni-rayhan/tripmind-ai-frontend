import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Nusrat Jahan",
    role: "Traveled to Sylhet",
    rating: 5,
    text: "The AI recommendation actually understood what I wanted — a peaceful, nature-heavy trip within my budget. Sylhet's tea gardens were exactly what I needed after a stressful semester.",
    avatar: "N",
  },
  {
    name: "Tanvir Hasan",
    role: "Traveled to Bandarban",
    rating: 5,
    text: "I chatted with the AI assistant at midnight asking about trekking difficulty levels, and it gave me a clear, honest answer instantly. Booked the Bandarban trek the next morning.",
    avatar: "T",
  },
  {
    name: "Farhana Akter",
    role: "Traveled to Cox's Bazar",
    rating: 4,
    text: "Loved how easy it was to filter trips by price and category. The details page had everything I needed to know before booking, no surprises during the trip.",
    avatar: "F",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="mb-2 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
          Traveler Stories
        </span>
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          What Our Travelers Say
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          Real experiences from people who planned their trips with TripMind AI.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6"
          >
            <Quote className="mb-3 h-6 w-6 text-teal-200" />
            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < t.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                  }`}
                />
              ))}
            </div>
            <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-600">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-sm font-semibold text-white">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}