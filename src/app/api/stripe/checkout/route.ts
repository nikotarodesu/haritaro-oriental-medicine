import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";
import { SubscriptionPlan } from "@/types/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan, userId, userEmail } = body as {
      plan: SubscriptionPlan;
      userId?: string;
      userEmail?: string;
    };

    if (plan !== "monthly" && plan !== "yearly") {
      return NextResponse.json(
        { error: "無効なプランが指定されました。monthly または yearly を指定してください。" },
        { status: 400 }
      );
    }

    const planConfig = SUBSCRIPTION_CONFIG.pricing[plan];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.haritaro.jp";
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    // Stripe APIキーが設定されていない場合の安全なシミュレーションモード
    if (!stripeKey) {
      console.warn("STRIPE_SECRET_KEY is not configured. Running in demo simulation mode.");
      return NextResponse.json({
        demo: true,
        message: "Stripe APIキーが未設定のため、デモ体験モードでアップグレードを完了します。",
        redirectUrl: `${appUrl}/account/subscription?plan=${plan}&demo_upgraded=true`,
      });
    }

    // Stripe クライアント初期化
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-02-24.acacia" as any,
    });

    // Price ID が環境変数等で設定されている場合は既存のPriceを使用し、なければインラインで作成
    const hasConfiguredPrice = planConfig.stripePriceId && planConfig.stripePriceId.startsWith("price_");

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = hasConfiguredPrice
      ? [
          {
            price: planConfig.stripePriceId,
            quantity: 1,
          },
        ]
      : [
          {
            price_data: {
              currency: planConfig.currency,
              product_data: {
                name: `はり太郎の東洋医学 プレミアム会員（${plan === "yearly" ? "年額プラン" : "月額プラン"}）`,
                description: planConfig.description,
              },
              unit_amount: planConfig.amount,
              recurring: {
                interval: planConfig.billingInterval as Stripe.Checkout.SessionCreateParams.LineItem.PriceData.Recurring.Interval,
              },
            },
            quantity: 1,
          },
        ];

    // Checkout Session 作成（Managed Payments 対応: payment_method_types は自動管理のため除外）
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: userEmail || undefined,
      line_items: lineItems,
      metadata: {
        userId: userId || "anonymous",
        plan,
      },
      success_url: `${appUrl}/account/subscription?session_id={CHECKOUT_SESSION_ID}&upgraded=true&plan=${plan}`,
      cancel_url: `${appUrl}/pricing?canceled=true`,
    });

    return NextResponse.json({
      demo: false,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "決済セッションの作成中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}
