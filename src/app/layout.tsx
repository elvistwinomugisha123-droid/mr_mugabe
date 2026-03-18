import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "MR. MUGABE Digital Services",
  description: "Your Best Deals on Data, Calls & Internet in Kampala, Uganda",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MR. MUGABE",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1628",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8K0ETV4917"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8K0ETV4917');
          `}
        </Script>
      </head>
      <body className="antialiased bg-background text-foreground">
        <header className="bg-primary text-white sticky top-0 z-50 border-b border-white/10">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-lg font-bold text-accent">
              MR. MUGABE
            </a>
            <a
              href="https://wa.me/256787767132"
              className="text-sm bg-accent text-primary font-semibold px-3 py-1.5 rounded-lg"
            >
              WhatsApp Us
            </a>
          </div>
        </header>
        <main className="max-w-lg mx-auto px-4 py-6 min-h-screen">
          {children}
        </main>
        <footer className="bg-black/30 text-white py-6 border-t border-white/10">
          <div className="max-w-lg mx-auto px-4 text-center text-sm space-y-2">
            <p className="font-semibold text-accent">MR. MUGABE Digital Services</p>
            <p>Along Kisaasi Bukoto Road, Opposite ORXY Petrol Station</p>
            <p>near Tales Bar & Lounge, Bukoto Kampala</p>
            <div className="flex justify-center gap-4 pt-2">
              <a href="tel:+256787767132" className="underline">0787767132</a>
              <a href="tel:+256758320515" className="underline">0758320515</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
