import { getServices, findBundle } from "@/lib/services";
import { notFound } from "next/navigation";
import OrderForm from "./OrderForm";

export const revalidate = 300;

export default async function OrderPage({
  params,
}: {
  params: Promise<{ bundleId: string }>;
}) {
  const { bundleId } = await params;
  const data = await getServices();
  const result = findBundle(data, bundleId);

  if (!result) notFound();

  return (
    <OrderForm
      bundle={result.bundle}
      category={result.category}
      subcategory={result.subcategory}
      payment={data.business.payment}
    />
  );
}
