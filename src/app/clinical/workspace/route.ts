function redirectToClinical() {
  return new Response(null, {
    status: 307,
    headers: {
      Location: '/clinical',
      'Cache-Control': 'no-store',
      'Referrer-Policy': 'no-referrer',
    },
  });
}

export { redirectToClinical as GET, redirectToClinical as HEAD };
