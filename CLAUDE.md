# Mr. Mugabe Digital Services — PWA Website

## Project Overview
Build a **Progressive Web App (PWA)** for Mr. Mugabe Digital Services, a telecom reseller in Kampala, Uganda. Customers browse services, place orders, upload payment screenshots, and Mr. Mugabe receives instant WhatsApp alerts.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **PWA:** next-pwa
- **File Uploads:** Cloudinary (payment screenshots)
- **Notifications:** Make.com webhook → WhatsApp to Mr. Mugabe
- **Content Management:** Google Sheets API (Mr. Mugabe updates prices from his phone)
- **Hosting:** Vercel

## Business Info
- **Brand:** Mr. Mugabe Digital Services
- **Location:** Along Kisaasi Bukoto Road, Opposite ORXY Petrol Station near Tales Bar & Lounge, Bukoto Kampala
- **WhatsApp:** 0787767132
- **Phone 2:** 0758320515

## Payment Methods
| Method | Number | Name | Merchant Code |
|---|---|---|---|
| MTN Mobile Money | 0787767132 | Mugabe Rodgers | 218269 |
| Airtel Money | 0758320515 | Agaba Gaitan | 6106639 (KOMUGA) |

## Color Scheme
- Primary: Deep Blue (#0A1628) — matches Mr. Mugabe brand
- Accent: Gold/Yellow (#F5A623)
- Background: White (#FFFFFF)
- Text: Dark (#1A1A1A)

---

## Order Flow (Critical — Build Exactly This)
1. Customer lands on homepage → sees service categories
2. Customer picks a category (e.g. "Airtel Data")
3. Customer picks a specific plan (e.g. "9GB — 9,000 UGX")
4. Customer fills: Full Name + Phone Number
5. Customer sees payment instructions (MTN MoMo or Airtel Money details)
6. Customer uploads payment screenshot
7. Customer clicks Submit
8. Make.com webhook fires → Mr. Mugabe gets WhatsApp alert with full order details + screenshot link
9. Customer sees "Order Received" confirmation page

---

## Content Management — Google Sheets Integration
Mr. Mugabe manages all prices and services via a Google Sheet on his phone.

### How it works:
- Google Sheet has tabs for each service category
- Each row = one bundle: `name`, `price`, `validity`, `notes`, `active` (TRUE/FALSE)
- Website fetches sheet data on every page load via Google Sheets API
- If `active = FALSE`, that bundle is hidden from the website
- Mr. Mugabe can add new rows anytime → instantly shows on site

### Sheet Structure (replicate this exactly):
Each tab columns: `id | name | price_ugx | validity | notes | active`

### Tabs:
1. `airtel_weekly` 
2. `airtel_freaky_weekend`
3. `airtel_4day_combo`
4. `airtel_monthly`
5. `airtel_mifi_monthly`
6. `airtel_komuga`
7. `mtn_monthly_data`
8. `mtn_freedom_data`
9. `mtn_gaga`
10. `mtn_annual`
11. `mtn_voice_freedom`
12. `mtn_voice_monthly`
13. `mtn_talktalk`
14. `wakanet_fibre`
15. `wakanet_4g_router_speeds`
16. `wakanet_4g_router_bundles`
17. `wakanet_5g_bundles`
18. `wakanet_5g_speeds`

### Fallback:
If Google Sheets API fails, fall back to `data/services.json` (local fallback file — always kept updated).

---

## Services Data
All services and current prices are in `data/services.json`. Use this as the fallback and the source of truth for initial setup.

---

## Environment Variables Needed
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
MAKE_WEBHOOK_URL=
GOOGLE_SHEETS_API_KEY=
GOOGLE_SHEET_ID=
```

---

## Pages to Build
1. `/` — Homepage with service category cards
2. `/services/[category]` — List of bundles in that category
3. `/order/[bundleId]` — Order form (name, phone, payment upload)
4. `/order/success` — Confirmation page
5. `/admin/preview` — Simple preview of what's in the Google Sheet (optional, protected)

---

## PWA Requirements
- `manifest.json` with brand colors, icons, app name
- Service Worker for offline caching of homepage
- Installable on Android homescreen
- Works on 2G/3G (optimize all images, lazy load)

---

## WhatsApp Notification Format (Make.com webhook payload)
```json
{
  "customer_name": "John Doe",
  "customer_phone": "0701234567",
  "service_category": "Airtel Data",
  "bundle_name": "Freaky Weekend 9GB",
  "price": "9000",
  "payment_method": "MTN MoMo",
  "screenshot_url": "https://cloudinary.com/...",
  "timestamp": "2026-03-09 14:30"
}
```
Make.com formats this into a WhatsApp message to 0787767132.

---

## Security Notes
- Never expose Cloudinary secret or Make.com webhook URL on the client
- All file uploads go through `/api/upload` server route
- Webhook fires from `/api/order` server route only
- Validate file type (image only) and size (max 5MB) on upload

---

## UI Guidelines
- Mobile-first (99% of customers are on phones)
- Large tap targets (min 48px)
- Show prices in UGX format: `9,000 UGX`
- Use card-based layout for bundles
- Show validity/notes as a badge below each bundle name
- Loading skeleton states for Google Sheets fetch
- Error state with fallback to JSON data

---

## Do NOT Build
- User accounts / login
- Order history / database
- Cart / multi-item orders (one order at a time)
- Airtime conversion or Yaka/NWSC (Mr. Mugabe handles these manually via WhatsApp)