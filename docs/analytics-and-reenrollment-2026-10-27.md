# Analytics reporting and customer re-enrollment

## Reporting connection

The local reporting workflow loads `.env.local` through `@next/env`. Set `GA4_PROPERTY_ID`, `GSC_SITE_URL` and `GOOGLE_APPLICATION_CREDENTIALS` there; the file is ignored by Git. Keep the Google credential file outside the repository. `npm run check:analytics` checks configuration without sending requests, and `npm run report:analytics -- --output=<path>` retrieves read-only, host-filtered GA4 and Search Console aggregates. Billing funnel event names are included in the aggregate event report.

The configured service account can read the intended GA4 property and the canonical HTTPS Search Console property. Analytics Admin API is disabled in its Cloud project; enabling it was not performed. Confirm the intended web stream's measurement ID in the GA4 UI before claiming production event delivery is verified. The existing Google tag configuration contains two destination IDs, so merely seeing a tag script or an HTTP 204 does not establish that the intended property recorded the event.

## Re-enrollment after customer deletion

Checkout retrieves the server-owned customer first. A confirmed deleted customer can be replaced only after any stored contract is verified to belong to it and to have ended. Lookup failures, ownership mismatches and unexpectedly active contracts still stop Checkout. Replacement is initiated by the member's subscription action, never by reading their account.

The replacement customer is saved before a payable Checkout is created. Customer creation idempotency includes the deleted customer ID, and Checkout idempotency includes the current customer ID. This avoids reusing cached objects for an obsolete customer. Failed membership persistence creates no Checkout; retries reuse the same replacement key. An abandoned Checkout leaves the member free. An admin role remains an admin role.

Up to ten retired customer references are retained in server-owned app metadata. Verified terminal notifications for them are acknowledged without restoring the old binding or changing current access. Successful new payment can then bind the replacement subscription, and delayed old cancellation events cannot remove it. The Portal returns an actionable conflict message for a deleted customer.

## Subscription funnel

- `upgrade_click`: pricing subscription button pressed.
- `checkout_login_required`: anonymous visitor needs authentication; the selected monthly/yearly plan is retained in the return URL.
- `begin_checkout`: the API returned a Checkout URL. Login/payment navigation waits for the event callback with a 1.2-second hard fallback, so unavailable analytics cannot block the user.
- `checkout_error`: only a coarse request/network failure class is measured.
- `purchase`: a new, instrumented Checkout completed and the authenticated status API verified ownership, payment and the currently bound subscription.

New sessions return to `/checkout/complete`; existing success URLs remain supported. This confirmation page has noindex metadata, exposes no customer details and leaves the user a link to account management. A payment is measured only for the instrumented session metadata version, within seven days of creation, and while its current paid contract remains valid. A normal account visit and historical Checkout do not create purchase receipts.

Purchase receipts contain plan, actual gross JPY total and a SHA-256-derived transaction token. They contain no raw Stripe session/customer/subscription identifiers or member identity. The browser deduplicates queued/emitted receipts and remembers recent tokens in session storage; GA4 receives the same transaction token on any legitimate retry. Public page URLs and referrers continue to remove query strings and private paths. Notes, interviews, account and login pages remain excluded. This is client conversion measurement, not a billing ledger: browser blocking, a missing return visit, renewals and refunds need separate consideration.

## Validation

`npm run test:billing` covers deleted-customer recovery, save failures, idempotency, lookup failures, unexpectedly active contracts, ownership, old terminal notifications and paid receipt eligibility. `npm run test:analytics` covers stream targeting, payload minimization, queueing, receipt deduplication, excluded routes and navigation fallback. ESLint and `npm run build -- --webpack` pass with 575 pages. A local browser fixture verifies confirmation rendering, one purchase command across reload and removal of raw session/query values. Those fixture purchase commands are not sent to Google and create no charges.

Production event ingestion and final stream selection remain pending confirmation of the GA4 UI measurement ID. No real customer or payment has been created to test re-enrollment.
