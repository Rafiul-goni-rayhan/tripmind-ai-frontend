import { MapPin, Users, Star, Sparkles } from "lucide-react";

const stats = [
  { icon: MapPin, value: "50+", label: "Destinations" },
  { icon: Users, value: "2,500+", label: "Happy Travelers" },
  { icon: Star, value: "4.7", label: "Average Rating" },
  { icon: Sparkles, value: "24/7", label: "AI Assistant Support" },
];

export default function Stats() {
  return (
    <section className="bg-teal-700 py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 md:grid-cols-4 md:px-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Icon className="h-6 w-6 text-amber-300" />
              </div>
              <p className="text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-teal-100">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}