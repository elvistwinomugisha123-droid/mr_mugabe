import { getServices } from "@/lib/services";
import CategoryCard from "@/components/CategoryCard";
import { MapPin } from "lucide-react";
import Image from "next/image";

export const revalidate = 300;

export default async function HomePage() {
  const data = await getServices();

  return (
    <div className="space-y-6">
      <section className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-accent">
          {data.business.name}
        </h1>
        <p className="text-sm text-white/70">{data.business.tagline}</p>
        <div className="flex items-center justify-center gap-1 text-xs text-white/50">
          <MapPin className="w-3 h-3" />
          <span>Bukoto, Kampala</span>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-lg text-white">
          Browse Services
        </h2>
        <div className="space-y-3">
          {data.categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="bg-white/10 border border-white/20 rounded-xl overflow-hidden">
        <div className="relative w-full h-48">
          <Image
            src="/mr-mugabe-airtime.svg"
            alt="MR. MUGABE — Convert your excess Airtime to Cash"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="p-4 text-center space-y-2">
          <p className="font-bold text-accent text-lg">Convert Your Extra Airtime to Cash</p>
          <p className="text-white/70 text-sm">
            Stuck with excess airtime? MR. MUGABE helps you convert it to cash instantly!
          </p>
          <a
            href="https://wa.me/256787767132?text=Hello%20MR.%20MUGABE!%20I%20want%20to%20convert%20my%20airtime%20to%20cash."
            className="inline-block bg-accent text-primary font-semibold px-5 py-2.5 rounded-lg mt-1"
          >
            Convert Airtime Now
          </a>
        </div>
      </section>

      <section className="bg-white/10 border border-white/20 rounded-xl p-4 text-center text-sm space-y-2">
        <p className="font-semibold text-accent">Need Airtime, Yaka, or NWSC?</p>
        <p className="text-white/70">
          Contact MR. MUGABE directly on WhatsApp for these services.
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
