import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerId } = body as { customerId?: string };

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.haritaro.jp";
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return NextResponse.json({
        demo: true,
        message: "Stripe APIキーが未設定のため、マイページの契約管理画面をご利用ください。",
        url: `${appUrl}/account/subscription`,
      });
    }

    if (!customerId) {
      return NextResponse.json(
        { error: "Stripe顧客ID（customerId）が必要です。" },
        { status: 400 }
      );
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-02-24.acacia" as any,
    });

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${appUrl}/account/subscription`,
    });

    return NextResponse.json({
      demo: false,
      url: portalSession.url,
    });
  } catch (error: any) {
    console.error("Stripe Portal Error:", error);
    return NextResponse.json(
      { error: error.message || "カスタマーポータルの作成に失敗しました。" },
      { status: 500 }
    );
  }
}
