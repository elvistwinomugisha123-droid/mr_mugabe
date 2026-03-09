"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Bundle } from "@/lib/types";

export default function BundleCard({
  bundle,
  categoryId,
}: {
  bundle: Bundle;
  categoryId: string;
}) {
  return (
    <Link href={`/order/${bundle.id}?cat=${categoryId}`}>
      <div className="border border-white/20 bg-white/5 rounded-xl p-4 flex items-center justify-between gap-3 transition-all active:scale-[0.98] hover:border-accent hover:shadow-sm">
        <div className="min-w-0">
          <h4 className="font-bold text-white">{bundle.name}</h4>
          <div className="flex flex-wrap gap-1.5 mt-1">
            <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
              {bundle.validity}
            </span>
            {bundle.notes && (
              <span className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
                {bundle.notes}
              </span>
            )}
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold text-accent text-lg">
            {formatPrice(bundle.price_ugx)}
          </p>
        </div>
      </div>
    </Link>
  );
}
