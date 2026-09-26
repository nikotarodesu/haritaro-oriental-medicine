import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json(
      { message: "Stripe webhook is not active (keys not configured)" },
      { status: 200 }
    );
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: "2025-02-24.acacia" as any,
  });

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe signature" }, { status: 400 });
  }

  try {
    const rawBody = await req.text();
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    let supabaseAdmin: any = null;
    if (supabaseUrl && supabaseServiceKey) {
      supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan || "monthly";
        console.log(`[Stripe Webhook] Checkout completed for customer: ${session.customer}, user: ${userId}, plan: ${plan}`);

        if (supabaseAdmin && userId && userId !== "anonymous") {
          try {
            const periodDuration = plan === "yearly" ? 365 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
            const now = Date.now();
            await supabaseAdmin.auth.admin.updateUserById(userId, {
              user_metadata: {
                role: "premium",
                subscription: {
                  plan,
                  status: "active",
                  stripeCustomerId: session.customer,
                  stripeSubscriptionId: session.subscription,
                  currentPeriodStart: now,
                  currentPeriodEnd: now + periodDuration,
                  cancelAtPeriodEnd: false,
                },
              },
            });
            console.log(`[Stripe Webhook] Successfully upgraded user ${userId} to premium`);
          } catch (updateErr: any) {
            console.error(`[Stripe Webhook] Failed to update user ${userId}:`, updateErr.message);
          }
        }
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Stripe Webhook] Subscription updated: ${subscription.id}, status: ${subscription.status}`);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Stripe Webhook] Subscription canceled: ${subscription.id}`);
        break;
      }
      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("[Stripe Webhook Error]:", err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }
}
