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
      const message = `Hello Mr. Mugabe! 👋

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
    const message = `Hello Mr. Mugabe! 👋

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
        <Link href="/" className="p-2 -ml-2 rounded-lg hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-primary">Place Order</h1>
      </div>

      <div className="bg-primary/5 rounded-xl p-4 space-y-1">
        <p className="text-sm text-foreground/60">{category} &bull; {subcategory}</p>
        <p className="font-bold text-lg">{bundle.name}</p>
        <p className="text-accent font-bold text-xl">{formatPrice(bundle.price_ugx)}</p>
        {bundle.validity && (
          <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {bundle.validity}
          </span>
        )}
      </div>

      <form onSubmit={handleUploadAndSend} className="space-y-5">
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-semibold text-foreground">Full Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-foreground">Phone Number</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0701234567"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </label>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Payment Method</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("mtn")}
              className={`border-2 rounded-lg p-3 text-center text-sm font-semibold transition-all ${
                paymentMethod === "mtn"
                  ? "border-yellow-400 bg-yellow-50 text-yellow-800"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              MTN MoMo
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("airtel")}
              className={`border-2 rounded-lg p-3 text-center text-sm font-semibold transition-all ${
                paymentMethod === "airtel"
                  ? "border-red-400 bg-red-50 text-red-800"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              Airtel Money
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <p className="font-semibold text-primary">Send {formatPrice(bundle.price_ugx)} to:</p>
            <div className="space-y-1">
              <p><span className="text-foreground/60">Number:</span> <span className="font-bold">{selectedPayment.number}</span></p>
              <p><span className="text-foreground/60">Name:</span> <span className="font-bold">{selectedPayment.name}</span></p>
              <p><span className="text-foreground/60">Merchant Code:</span> <span className="font-bold">{selectedPayment.merchant_code}</span></p>
              {selectedPayment.merchant_name && (
                <p><span className="text-foreground/60">Merchant:</span> <span className="font-bold">{selectedPayment.merchant_name}</span></p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Upload Payment Screenshot</p>
          <label className="block cursor-pointer">
            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              file ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-accent"
            }`}>
              {file ? (
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
              ) : (
                <div className="space-y-2 text-gray-400">
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
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {screenshotUrl ? (
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm text-center">
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
              className="block w-full border-2 border-primary text-primary font-semibold py-3 rounded-xl text-center"
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
