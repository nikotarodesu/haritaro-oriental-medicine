/** A fixed-document relay keeps public click batches alive across private SPA routes. */
export function subscriptionAnalyticsRelayHtml(measurementId: string): string {
  if (!/^G-[A-Z0-9]+$/.test(measurementId) || ['G-XXXXXXXXXX', 'G-GE4JNB164V'].includes(measurementId)) return '';
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Haritaro analytics</title></head><body><script>
(() => {
  if (window.parent === window) return;
  const origin = window.location.origin;
  const measurementId = ${JSON.stringify(measurementId)};
  window['ga-disable-G-GE4JNB164V'] = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false, page_location: origin + '/pricing', page_referrer: '',
    page_title: 'Haritaro Pricing', allow_google_signals: false, allow_ad_personalization_signals: false
  });
  window.addEventListener('message', event => {
    if (event.origin !== origin || event.source !== window.parent) return;
    const data = event.data;
    if (!data || data.type !== 'haritaro:subscription-step:v1' || !Number.isInteger(data.id) || data.id < 1 || data.id > 1000000000) return;
    if (!['upgrade_click', 'checkout_login_required'].includes(data.name) || !['monthly', 'yearly'].includes(data.plan)) return;
    window.gtag('event', data.name, {
      send_to: measurementId, plan: data.plan, placement: 'pricing',
      page_location: origin + '/pricing', page_path: '/pricing', page_referrer: '', page_title: 'Haritaro Pricing',
      event_timeout: 800,
      event_callback: () => window.parent.postMessage({ type: 'haritaro:subscription-ack:v1', id: data.id }, origin)
    });
  });
  window.parent.postMessage({ type: 'haritaro:subscription-ready:v1' }, origin);
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(script);
})();
</script></body></html>`;
}
