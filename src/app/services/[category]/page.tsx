import { getServices } from "@/lib/services";
import BundleCard from "@/components/BundleCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 300;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = await getServices();
  const cat = data.categories.find((c) => c.id === category);

  if (!cat) notFound();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="p-2 -ml-2 rounded-lg hover:bg-white/10 active:bg-white/20 text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-accent">{cat.name}</h1>
      </div>

      {cat.subcategories.map((sub) => {
        const activeBundles = sub.bundles.filter((b) => b.active);
        if (activeBundles.length === 0) return null;

        return (
          <section key={sub.id} className="space-y-2">
            <h2 className="font-semibold text-sm text-white/70 uppercase tracking-wide">
              {sub.name}
            </h2>
            <div className="space-y-2">
              {activeBundles.map((bundle) => (
                <BundleCard
                  key={bundle.id}
                  bundle={bundle}
                  categoryId={cat.id}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
