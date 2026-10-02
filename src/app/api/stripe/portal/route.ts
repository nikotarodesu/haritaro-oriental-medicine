import { authenticatedUser, BillingError, billingErrorResponse, checkOrigin, stripeClient } from '@/lib/billing';
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    const user = await authenticatedUser();
    const customer = user.app_metadata.subscription?.stripeCustomerId;
    if (typeof customer !== 'string' || !customer.startsWith('cus_')) throw new BillingError('ご本人の契約が見つかりません。', 409);
    const session = await stripeClient().billingPortal.sessions.create({ customer, return_url: new URL(request.url).origin + '/account/subscription' });
    return Response.json({ url: session.url });
  } catch (error) { return billingErrorResponse(error); }
}
