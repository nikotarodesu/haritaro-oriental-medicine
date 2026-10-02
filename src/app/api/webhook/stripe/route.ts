import type Stripe from 'stripe';
import { billingErrorResponse, stripeClient, syncSubscription } from '@/lib/billing';
export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  if (!signature) return Response.json({ error: 'Missing stripe signature' }, { status: 400 });
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return Response.json({ error: 'Webhook is not configured' }, { status: 503 });
  let event: Stripe.Event;
  let stripe: Stripe;
  try { stripe = stripeClient(); }
  catch (error) { return billingErrorResponse(error); }
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, secret);
  } catch { return Response.json({ error: 'Invalid webhook signature' }, { status: 400 }); }
  try {
    if (event.livemode !== /^(sk|rk)_live_/.test(process.env.STRIPE_SECRET_KEY || '')) return Response.json({ error: 'Webhook mode mismatch' }, { status: 400 });
    const object = event.data.object;
    let subscriptionId: string | undefined;
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const session = object as Stripe.Checkout.Session;
      if (session.mode === 'subscription' && ['paid','no_payment_required'].includes(session.payment_status)) subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
    } else if (['customer.subscription.created','customer.subscription.updated','customer.subscription.deleted','customer.subscription.paused','customer.subscription.resumed'].includes(event.type)) {
      subscriptionId = (object as Stripe.Subscription).id;
    } else if (['invoice.paid','invoice.payment_failed','invoice.payment_action_required'].includes(event.type)) {
      const invoice = object as Stripe.Invoice;
      const legacy = invoice as unknown as { subscription?: string | Stripe.Subscription };
      const reference = invoice.parent?.subscription_details?.subscription || legacy.subscription;
      subscriptionId = typeof reference === 'string' ? reference : reference?.id;
    }
    if (subscriptionId) await syncSubscription(stripe, subscriptionId);
    return Response.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook fulfillment failed', { eventId: event.id, eventType: event.type });
    return billingErrorResponse(error);
  }
}
