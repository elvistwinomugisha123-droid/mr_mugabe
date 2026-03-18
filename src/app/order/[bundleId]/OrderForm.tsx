"use client";

import { useState } from "react";
import { ArrowLeft, Upload, Loader2, CheckCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Bundle, PaymentInfo } from "@/lib/types";

export default function OrderForm({
  bundle,
  category,
  subcategory,
  payment,
}: {
  bundle: Bundle;
  category: string;
  subcategory: string;
  payment: { mtn: PaymentInfo; airtel: PaymentInfo };
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mtn" | "airtel">("mtn");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [error, setError] = useState("");

  const selectedPayment = paymentMethod === "mtn" ? payment.mtn : payment.airtel;

  async function handleUploadAndSend(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim()) {
      setError("Please fill in your name and phone number.");
      return;
    }

    if (!file) {
      setError("Please upload a payment screenshot.");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        setError(uploadData.error || "Upload failed");
        setUploading(false);
        return;
      }

      setUploading(false);
      const uploadedUrl = uploadData.url;
      setScreenshotUrl(uploadedUrl);

      // Build WhatsApp message
      const paymentLabel = paymentMethod === "mtn" ? "MTN MoMo" : "Airtel Money";
      const bundleName = `${subcategory} — ${bundle.name}`;
      const message = `Hello MR. MUGABE! 👋

*New Order*
------------------------
📦 Bundle: ${bundleName}
💰 Price: ${formatPrice(bundle.price_ugx)}
📱 My Number: ${phone.trim()}
👤 Name: ${name.trim()}
💳 Payment: ${paymentLabel}
🖼️ Screenshot: ${uploadedUrl}
------------------------
I have made the payment. Please confirm. 🙏`;

      const whatsappUrl = `https://wa.me/256787767132?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    } catch {
      setError("Something went wrong. Please try again.");
      setUploading(false);
    }
  }

  function handleSendAgain() {
    const paymentLabel = paymentMethod === "mtn" ? "MTN MoMo" : "Airtel Money";
    const bundleName = `${subcategory} — ${bundle.name}`;
    const message = `Hello MR. MUGABE! 👋

*New Order*
------------------------
📦 Bundle: ${bundleName}
💰 Price: ${formatPrice(bundle.price_ugx)}
📱 My Number: ${phone.trim()}
👤 Name: ${name.trim()}
💳 Payment: ${paymentLabel}
🖼️ Screenshot: ${screenshotUrl}
------------------------
I have made the payment. Please confirm. 🙏`;

    const whatsappUrl = `https://wa.me/256787767132?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/" className="p-2 -ml-2 rounded-lg hover:bg-white/10 text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-accent">Place Order</h1>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-xl p-4 space-y-1">
        <p className="text-sm text-white/60">{category} &bull; {subcategory}</p>
        <p className="font-bold text-lg text-white">{bundle.name}</p>
        <p className="text-accent font-bold text-xl">{formatPrice(bundle.price_ugx)}</p>
        {bundle.validity && (
          <span className="inline-block text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
            {bundle.validity}
          </span>
        )}
      </div>

      <form onSubmit={handleUploadAndSend} className="space-y-5">
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-semibold text-white">Full Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="mt-1 w-full border border-white/20 bg-white/10 text-white placeholder:text-white/40 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-white">Phone Number</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0701234567"
              className="mt-1 w-full border border-white/20 bg-white/10 text-white placeholder:text-white/40 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </label>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-white">Payment Method</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("mtn")}
              className={`border-2 rounded-lg p-3 text-center text-sm font-semibold transition-all ${
                paymentMethod === "mtn"
                  ? "border-yellow-400 bg-yellow-400/20 text-yellow-300"
                  : "border-white/20 text-white/50"
              }`}
            >
              MTN MoMo
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("airtel")}
              className={`border-2 rounded-lg p-3 text-center text-sm font-semibold transition-all ${
                paymentMethod === "airtel"
                  ? "border-red-400 bg-red-400/20 text-red-300"
                  : "border-white/20 text-white/50"
              }`}
            >
              Airtel Money
            </button>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-xl p-4 space-y-2 text-sm">
            <p className="font-semibold text-accent">Send {formatPrice(bundle.price_ugx)} to:</p>
            <div className="space-y-1 text-white">
              <p><span className="text-white/60">Number:</span> <span className="font-bold">{selectedPayment.number}</span></p>
              <p><span className="text-white/60">Name:</span> <span className="font-bold">{selectedPayment.name}</span></p>
              <p><span className="text-white/60">Merchant Code:</span> <span className="font-bold">{selectedPayment.merchant_code}</span></p>
              {selectedPayment.merchant_name && (
                <p><span className="text-white/60">Merchant:</span> <span className="font-bold">{selectedPayment.merchant_name}</span></p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-white">Upload Payment Screenshot</p>
          <label className="block cursor-pointer">
            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              file ? "border-green-400 bg-green-400/10" : "border-white/30 hover:border-accent"
            }`}>
              {file ? (
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
              ) : (
                <div className="space-y-2 text-white/40">
                  <Upload className="w-8 h-8 mx-auto" />
                  <p className="text-sm">Tap to upload screenshot</p>
                  <p className="text-xs">JPEG, PNG or WebP &bull; Max 5MB</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {screenshotUrl ? (
          <div className="space-y-3">
            <div className="bg-green-500/20 border border-green-400/30 text-green-300 px-4 py-3 rounded-lg text-sm text-center">
              Screenshot uploaded! Tap the button below to send your order.
            </div>
            <button
              type="button"
              onClick={handleSendAgain}
              className="w-full bg-green-600 text-white font-bold py-4 rounded-xl text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Send Order via WhatsApp
            </button>
            <Link
              href="/"
              className="block w-full border-2 border-accent text-accent font-semibold py-3 rounded-xl text-center"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-xl text-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading Screenshot...
              </>
            ) : (
              <>
                <MessageCircle className="w-5 h-5" />
                Send Order via WhatsApp
              </>
            )}
          </button>
        )}
      </form>
    </div>
  );
}
