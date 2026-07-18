import { Sparkles, MessageCircle, ShieldCheck, MapPinned } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Recommendations",
    description:
      "Tell us your budget and interests — our AI analyzes hundreds of trips to find your perfect match instantly.",
  },
  {
    icon: MessageCircle,
    title: "24/7 AI Travel Assistant",
    description:
      "Chat with our AI assistant anytime for destination advice, itinerary help, and instant answers to your travel questions.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Trusted Trips",
    description:
      "Every trip package is reviewed and rated by real travelers, so you know exactly what to expect.",
  },
  {
    icon: MapPinned,
    title: "Curated Destinations",
    description:
      "From beaches to mountains, explore a handpicked collection of the best destinations across Bangladesh.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="mb-2 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
          Why TripMind AI
        </span>
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Travel Planning, Reimagined with AI
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          We combine intelligent technology with curated experiences to make trip planning effortless.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
                <Icon className="h-5 w-5 text-teal-600" />
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}