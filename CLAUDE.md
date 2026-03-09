# Mr. Mugabe Digital Services — PWA Website

## Project Overview
A mobile-first **Progressive Web App (PWA)** for Mr. Mugabe Digital Services — a telecom reseller in Kampala, Uganda. Customers browse bundles, place orders with a payment screenshot, and Mr. Mugabe gets notified via WhatsApp.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **PWA:** next-pwa
- **File Uploads:** Cloudinary (payment screenshots)
- **Price Management:** Google Sheets API (Mr. Mugabe edits from his phone)
- **Order Notification:** WhatsApp deep link (wa.me) — NO Make.com, NO webhooks
- **Admin Page:** Built-in password-protected /admin page
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

## Order Flow (Final)
1. Customer browses → picks bundle
2. Customer fills: Name + Phone + Payment method
3. Customer uploads payment screenshot → goes to Cloudinary
4. Customer clicks "Send Order via WhatsApp"
5. WhatsApp opens with pre-filled message including Cloudinary screenshot URL
6. Customer sends → Mr. Mugabe receives and confirms

---

## Content Management — Google Sheets Integration
Mr. Mugabe manages all prices and services via a Google Sheet on his phone.

### How it works:
- Google Sheet has tabs for each service subcategory
- Each row = one bundle: `id`, `name`, `price_ugx`, `validity`, `notes`, `active` (TRUE/FALSE)
- Website fetches sheet data via Google Sheets API (cached 5 minutes)
- If `active = FALSE`, that bundle is hidden from customers
- Mr. Mugabe can add new rows anytime → shows on site after cache expires

### Sheet Structure:
Each tab columns: `id | name | price_ugx | validity | notes | active`

### Google Sheet Tabs:
1. `airtel_weekly`
2. `airtel_freaky_weekend`
3. `airtel_4day_combo`
4. `airtel_monthly`
5. `airtel_mifi_monthly`
6. `airtel_monthly_combo`
7. `airtel_chillax_calls`
8. `airtel_monthly_calls`
9. `mtn_monthly_data`
10. `mtn_freedom_data`
11. `mtn_gaga`
12. `mtn_annual`
13. `mtn_freedom_calls`
14. `mtn_monthly_minutes`
15. `mtn_talktalk`
16. `wakanet_fibre`
17. `wakanet_4g_router_speeds`
18. `wakanet_4g_router_bundles`
19. `wakanet_5g_bundles`
20. `wakanet_5g_speeds`
21. `lyca_monthly`

### Fallback:
If Google Sheets API fails, fall back to `data/services.json` (local fallback file).

---

## Services Data
All services and current prices are in `data/services.json`. Used as fallback and source of truth for initial setup.

---

## Environment Variables
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GOOGLE_SHEETS_API_KEY=
GOOGLE_SHEET_ID=
ADMIN_PASSWORD=mugabe123
```

---

## Pages
1. `/` — Homepage with service category cards
2. `/services/[category]` — List of bundles in that category
3. `/order/[bundleId]` — Order form (name, phone, payment upload, WhatsApp send)
4. `/order/success` — Confirmation page
5. `/admin` — Admin page for editing services.json (password-protected)

---

## PWA Requirements
- `manifest.json` with brand colors, icons, app name
- Service Worker for offline caching of homepage
- Installable on Android homescreen
- Works on 2G/3G (optimize all images, lazy load)

---

## WhatsApp Message Format
Pre-filled message sent via `wa.me/256787767132?text=...`:
```
Hello Mr. Mugabe! 👋

*New Order*
------------------------
📦 Bundle: [bundle name]
💰 Price: [price] UGX
📱 My Number: [customer phone]
👤 Name: [customer name]
💳 Payment: [MTN MoMo / Airtel Money]
🖼️ Screenshot: [cloudinary URL]
------------------------
I have made the payment. Please confirm. 🙏
```

---

## Security Notes
- Never expose Cloudinary secret on the client
- All file uploads go through `/api/upload` server route
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
- Make.com webhooks or any third-party notification service
