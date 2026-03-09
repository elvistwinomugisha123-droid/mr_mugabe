import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-5">
      <div className="bg-green-500/20 rounded-full p-4">
        <CheckCircle className="w-16 h-16 text-green-400" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-accent">Order Received!</h1>
        <p className="text-white/70 max-w-xs mx-auto">
          Thank you! Mr. Mugabe has been notified and will process your order shortly.
        </p>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-sm space-y-2 max-w-xs">
        <p className="font-semibold text-accent">What happens next?</p>
        <ol className="text-left space-y-1 text-white/70 list-decimal list-inside">
          <li>Mr. Mugabe verifies your payment</li>
          <li>Your bundle is activated</li>
          <li>You get a confirmation via WhatsApp or call</li>
        </ol>
      </div>

      <div className="space-y-3 w-full max-w-xs">
        <a
          href="https://wa.me/256787767132"
          className="block w-full bg-green-600 text-white font-semibold py-3 rounded-xl text-center"
        >
          Chat with Mr. Mugabe
        </a>
        <Link
          href="/"
          className="block w-full border-2 border-accent text-accent font-semibold py-3 rounded-xl text-center"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
