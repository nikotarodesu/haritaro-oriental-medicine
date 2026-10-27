# Analytics reporting and customer re-enrollment

## Reporting connection

The local reporting workflow loads `.env.local` through `@next/env`. Set `GA4_PROPERTY_ID`, `GSC_SITE_URL` and `GOOGLE_APPLICATION_CREDENTIALS` there; the file is ignored by Git. Keep the Google credential file outside the repository. `npm run check:analytics` checks configuration without sending requests, and `npm run report:analytics -- --output=<path>` retrieves read-only, host-filtered GA4 and Search Console aggregates. Billing funnel event names are included in the aggregate event report.

The configured service account can read the intended GA4 property and the canonical HTTPS Search Console property. Analytics Admin API is disabled in its Cloud project; enabling it was not performed. The owner confirmed the web stream's measurement ID as `G-GC398NZKVE` on October 27. The existing Google tag configuration contains two destination IDs, so merely seeing a tag script or an HTTP 204 does not establish that the intended property recorded the event.

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

The stream ID is confirmed; production event ingestion remains unverified in the Data API realtime report. No real customer or payment has been created to test re-enrollment.

## Linked Google tag destination

A production anonymous pricing → login check exposed an automatic `page_view` to the linked `G-GE4JNB164V` destination, including the login URL and its query. The explicit application events targeted the correct stream and used sanitized URLs. Google documents that enhanced history measurement can emit page views independently of `send_page_view: false`: https://developers.google.com/analytics/devguides/collection/ga4/views?technology=websites

The site now sets `window['ga-disable-G-GE4JNB164V'] = true` before loading the external tag. Loading waits for the inline initialization to complete, so the linked destination cannot start before the privacy control. The confirmed stream retains its public-route measurements and existing private-route opt-out. This is an on-site control; no Google property or Cloud configuration is changed. The per-property opt-out is documented at https://developers.google.com/tag-platform/security/guides/privacy

After the change, analytics regression tests, ESLint and the 575-page Webpack build passed. A fresh local browser loaded the real external Google library with collection intercepted: the privacy flag was present at every tag load, pricing click/login-required events targeted only the confirmed stream, both destinations were disabled on the login route, and no private URL, query or synthetic Checkout ID reached the intercepted collection requests. No test purchase or customer was created.
