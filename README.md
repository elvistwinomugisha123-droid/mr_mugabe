# Mr. Mugabe Digital Services — PWA

A mobile-first Progressive Web App for ordering telecom bundles in Kampala, Uganda.

## Quick Start

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
npm install next-pwa cloudinary @google-cloud/local-auth googleapis
npx shadcn@latest init
```

## Setup

1. Copy `.env.example` to `.env.local` and fill in all values
2. Run `npm run dev`
3. Deploy to Vercel

## Content Management

Mr. Mugabe manages all prices via Google Sheets on his phone.
- Open the linked Google Sheet
- Edit any price, name, or validity
- Add a new row to add a new bundle
- Set `active` to FALSE to hide a bundle
- Changes reflect on the website immediately

## Order Flow

Customer → Browse Services → Pick Plan → Fill Form → Upload Payment Screenshot → Submit → Mr. Mugabe gets WhatsApp alert

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS + shadcn/ui  
- next-pwa (installable PWA)
- Cloudinary (screenshot uploads)
- Make.com (WhatsApp notifications)
- Google Sheets API (price management)
- Vercel (hosting)
