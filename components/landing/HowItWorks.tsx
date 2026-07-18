import { Search, Sparkles, Plane } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Explore & Search",
    description:
      "Browse our curated collection of trips or search by destination, category, or budget to find what excites you.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Get AI Recommendations",
    description:
      "Tell our AI your preferences and let it match you with the perfect trip based on your interests and budget.",
  },
  {
    icon: Plane,
    step: "03",
    title: "Book & Travel",
    description:
      "Review the details, chat with our AI assistant for any questions, and get ready for your next adventure.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="mb-2 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
          Simple Process
        </span>
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">How It Works</h2>
        <p className="mt-3 text-sm text-slate-500">
          Planning your next trip takes just three simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.step} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-[60%] hidden h-px w-[80%] bg-slate-200 sm:block" />
              )}
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-600">
                <Icon className="h-7 w-7 text-white" />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-white">
                  {step.step}
                </span>
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}