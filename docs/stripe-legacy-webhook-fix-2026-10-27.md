# Legacy Stripe customer webhook handling

## Problem and cause

A member can have a legacy subscription under one Stripe customer and the authoritative subscription under another. Historical Checkout code created subscriptions using `customer_email` without reusing a stored customer or checking for an existing contract. Newer code persists a customer before Checkout and checks that customer's subscriptions, but cannot discover every historical customer that was never stored.

Renewals of a verified legacy contract previously failed the customer mismatch check before reaching the non-current subscription guard. Stripe retried these failures even though the current membership was valid. Two independent active subscriptions still represent two billable contracts; acknowledging a webhook does not resolve duplicate billing.

## Change

When the incoming subscription belongs to another customer, retrieve the authoritative subscription from the server-owned member binding. Acknowledge the delivery without any member update only if that subscription belongs to the stored customer and resolves to the same member. Resolve legacy ownership through its Checkout session when subscription metadata is absent. Keep a warning containing subscription references so duplicate contracts remain visible to operators.

Unverified ownership conflicts still fail. Stripe/Supabase lookup failures remain retryable. The incoming contract cannot replace the stored customer, restore expired access, or revoke the current membership. Existing same-customer reconciliation and Checkout duplicate checks are retained.

## Validation and operational follow-up

`npm run test:billing` exercises signed renewal and paid-invoice deliveries with two different customer IDs, legacy metadata fallback, no membership writes, ended current access, inconsistent ownership, and an unavailable ownership lookup. Existing authentication, Checkout, cancellation, signature and retry tests also pass. These tests use fixtures and create no charges.

Changed files pass ESLint. The local default Turbopack build encountered a Windows CSS worker startup failure, including outside the sandbox. `npm run build -- --webpack` passed TypeScript and generated all 574 pages. Production uses its configured Vercel build and must be checked separately.

Actual cancellation/refund decisions require operator confirmation of which contract to retain. Keep the existing membership binding while reviewing the historical contract. After production deployment, verify the next Stripe delivery or resend the two failed events from Workbench. The connected Stripe API exposes no event-resend operation, so successful fixture tests alone do not establish that a real pending delivery has completed.

## Timestamp cancellation follow-up

Stripe may set `cancel_at` while `cancel_at_period_end` remains false. Treat a timestamp ending within the current paid period as a scheduled cancellation and bound access by the earlier of that timestamp and the paid period end. A timestamp beyond the current period must not extend paid access or falsely indicate that the next renewal is stopped. This also makes the existing account page's cancellation label accurate after synchronization.

Regression coverage includes cancellation at the period end with a false boolean, an earlier end, a later end, clearing the timestamp, and access immediately before/at expiry. `npm run test:billing`, ESLint, and `npm run build -- --webpack` pass with 574 pages. Reading or displaying a cancellation does not change the Stripe contract itself.
