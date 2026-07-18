import { Sparkles, Target, Users, Heart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const values = [
  {
    icon: Sparkles,
    title: "AI-First Approach",
    description:
      "We believe travel planning should be effortless. Our AI does the heavy lifting so you can focus on the excitement of the journey ahead.",
  },
  {
    icon: Target,
    title: "Curated Quality",
    description:
      "Every trip on our platform is reviewed for quality, safety, and authenticity, ensuring you always know what to expect.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Real travelers share real experiences. Our ratings and reviews come from people who actually took the trip.",
  },
  {
    icon: Heart,
    title: "Local Passion",
    description:
      "We're passionate about showcasing the incredible diversity of destinations across Bangladesh, from beaches to hill tracts.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-slate-800 px-4 py-16 text-center md:px-8">
        <span className="mb-3 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur">
          Our Story
        </span>
        <h1 className="mx-auto max-w-2xl text-3xl font-bold text-white md:text-4xl">
          Making Travel Planning Effortless with AI
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-teal-50 md:text-base">
          TripMind AI was built to remove the guesswork from trip planning — combining
          curated destinations with intelligent, personalized recommendations.
        </p>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h2 className="mb-3 text-xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              We started TripMind AI with a simple observation: planning a trip takes hours
              of research across dozens of websites, and most of that information is generic,
              not personalized to what you actually want. We set out to build a platform
              where AI understands your preferences and does the research for you — matching
              you with destinations that fit your budget, interests, and travel style.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold text-slate-900">What Makes Us Different</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Unlike generic travel sites, every recommendation on TripMind AI is generated
              specifically for you through our AI engine. Our AI chat assistant is also
              available around the clock, ready to answer questions, suggest itineraries,
              and help you make confident decisions — no more sifting through endless
              forums and outdated blog posts.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
                    <Icon className="h-5 w-5 text-teal-600" />
                  </div>
                  <h3 className="mb-2 font-semibold text-slate-900">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}