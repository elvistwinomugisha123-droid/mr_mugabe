import type { ServicesData, Category, Bundle } from "./types";
import fallbackData from "@/../data/services.json";

const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

const SHEET_TABS = [
  "airtel_weekly",
  "airtel_freaky_weekend",
  "airtel_4day_combo",
  "airtel_monthly",
  "airtel_mifi_monthly",
  "airtel_monthly_combo",
  "airtel_chillax_calls",
  "airtel_monthly_calls",
  "mtn_monthly_data",
  "mtn_freedom_data",
  "mtn_gaga",
  "mtn_annual",
  "mtn_freedom_calls",
  "mtn_monthly_minutes",
  "mtn_talktalk",
  "wakanet_fibre",
  "wakanet_4g_router_speeds",
  "wakanet_4g_router_bundles",
  "wakanet_5g_bundles",
  "wakanet_5g_speeds",
];

async function fetchSheetTab(tabName: string): Promise<Bundle[]> {
  if (!GOOGLE_SHEETS_API_KEY || !GOOGLE_SHEET_ID) {
    throw new Error("Google Sheets not configured");
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${tabName}?key=${GOOGLE_SHEETS_API_KEY}`;
  const res = await fetch(url, { next: { revalidate: 300 } });

  if (!res.ok) throw new Error(`Failed to fetch ${tabName}`);

  const data = await res.json();
  const rows: string[][] = data.values || [];

  if (rows.length < 2) return [];

  return rows.slice(1).map((row) => ({
    id: row[0] || "",
    name: row[1] || "",
    price_ugx: parseInt(row[2]) || 0,
    validity: row[3] || "",
    notes: row[4] || "",
    active: (row[5] || "").toUpperCase() === "TRUE",
  })).filter((b) => b.active);
}

export async function getServicesFromSheets(): Promise<ServicesData | null> {
  try {
    const results = await Promise.all(
      SHEET_TABS.map((tab) => fetchSheetTab(tab))
    );

    const data = fallbackData as ServicesData;
    const tabBundlesMap = new Map<string, Bundle[]>();
    SHEET_TABS.forEach((tab, i) => {
      tabBundlesMap.set(tab, results[i]);
    });

    const categories: Category[] = data.categories.map((cat) => ({
      ...cat,
      subcategories: cat.subcategories.map((sub) => {
        const sheetBundles = tabBundlesMap.get(sub.id);
        return {
          ...sub,
          bundles: sheetBundles && sheetBundles.length > 0 ? sheetBundles : sub.bundles.filter((b) => b.active),
        };
      }),
    }));

    return { business: data.business, categories };
  } catch {
    return null;
  }
}

export function getFallbackData(): ServicesData {
  return fallbackData as ServicesData;
}

export async function getServices(): Promise<ServicesData> {
  const sheetData = await getServicesFromSheets();
  return sheetData || getFallbackData();
}

export function findBundle(data: ServicesData, bundleId: string): { bundle: Bundle; subcategory: string; category: string } | null {
  for (const cat of data.categories) {
    for (const sub of cat.subcategories) {
      const bundle = sub.bundles.find((b) => b.id === bundleId);
      if (bundle) {
        return { bundle, subcategory: sub.name, category: cat.name };
      }
    }
  }
  return null;
}
