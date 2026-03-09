import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mr. Mugabe Digital Services",
  description: "Your Best Deals on Data, Calls & Internet in Kampala, Uganda",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mr. Mugabe",
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
      <body className="antialiased bg-background text-foreground">
        <header className="bg-primary text-white sticky top-0 z-50">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-lg font-bold text-accent">
              Mr. Mugabe
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
        <footer className="bg-primary text-white py-6">
          <div className="max-w-lg mx-auto px-4 text-center text-sm space-y-2">
            <p className="font-semibold text-accent">Mr. Mugabe Digital Services</p>
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
