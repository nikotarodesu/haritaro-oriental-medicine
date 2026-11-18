export function membershipEnded() {
  return redirectToNotice("membership-ended");
}

export function notesEnded() {
  return redirectToNotice("notes-ended");
}

function redirectToNotice(anchor: "membership-ended" | "notes-ended") {
  return new Response(null, {
    status: 308,
    headers: {
      Location: `/updates#${anchor}`,
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
    },
  });
}

export function retiredSubscriptionApi(request: Request) {
  const headers = { "Cache-Control": "no-store", "Content-Type": "application/json; charset=utf-8" };
  const status = 410;
  if (request.method === "HEAD") return new Response(null, { status, headers });
  return Response.json({ error: "subscription_ended", message: "会員登録と有料プランの提供は終了しました。" }, { status, headers });
}
