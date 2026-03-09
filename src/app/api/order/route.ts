import { NextResponse } from "next/server";
import type { OrderPayload } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: OrderPayload = await request.json();

    if (!body.customer_name || !body.customer_phone || !body.bundle_name || !body.screenshot_url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("MAKE_WEBHOOK_URL not configured");
      return NextResponse.json({ success: true, message: "Order received (webhook not configured)" });
    }

    const payload: OrderPayload = {
      customer_name: body.customer_name,
      customer_phone: body.customer_phone,
      service_category: body.service_category,
      bundle_name: body.bundle_name,
      price: body.price,
      payment_method: body.payment_method,
      screenshot_url: body.screenshot_url,
      timestamp: new Date().toLocaleString("en-UG", { timeZone: "Africa/Kampala" }),
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!webhookResponse.ok) {
      console.error("Webhook failed:", webhookResponse.status);
    }

    return NextResponse.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}
