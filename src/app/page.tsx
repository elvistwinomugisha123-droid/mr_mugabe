import { getServices } from "@/lib/services";
import CategoryCard from "@/components/CategoryCard";
import { MapPin } from "lucide-react";

export const revalidate = 300;

export default async function HomePage() {
  const data = await getServices();

  return (
    <div className="space-y-6">
      <section className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-primary">
          {data.business.name}
        </h1>
        <p className="text-sm text-foreground/70">{data.business.tagline}</p>
        <div className="flex items-center justify-center gap-1 text-xs text-foreground/50">
          <MapPin className="w-3 h-3" />
          <span>Bukoto, Kampala</span>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-lg text-foreground">
          Browse Services
        </h2>
        <div className="space-y-3">
          {data.categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="bg-primary/5 rounded-xl p-4 text-center text-sm space-y-2">
        <p className="font-semibold text-primary">Need Airtime, Yaka, or NWSC?</p>
        <p className="text-foreground/70">
          Contact Mr. Mugabe directly on WhatsApp for these services.
        </p>
        <a
          href="https://wa.me/256787767132"
          className="inline-block bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg mt-1"
        >
          Chat on WhatsApp
        </a>
      </section>
    </div>
  );
}
