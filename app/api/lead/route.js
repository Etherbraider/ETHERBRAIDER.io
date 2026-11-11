const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,}$/i
const hits = new Map()

// 5 requests per IP per minute (per server instance).
const limited = ip => {
  const now = Date.now()
  const h = (hits.get(ip) ?? []).filter(t => now - t < 60_000)
  if (hits.size > 5000) hits.clear()
  hits.set(ip, [...h, now])
  return h.length >= 5
}

export async function POST(req) {
  const origin = req.headers.get('origin')
  if (origin && !origin.endsWith(`//${req.headers.get('host')}`)) return Response.json({ error: 'Forbidden' }, { status: 403 })
  if (limited(req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'local')) return Response.json({ error: 'Too many requests' }, { status: 429 })

  // Only known fields are forwarded; anything else in the body is dropped.
  const { email } = await req.json().catch(() => ({}))
  if (!EMAIL.test(email ?? '')) return Response.json({ error: 'Invalid input' }, { status: 400 })

  const url = process.env.LEAD_WEBHOOK_URL
  if (url) {
    const secret = process.env.LEAD_WEBHOOK_SECRET
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(secret && { 'x-webhook-secret': secret }) },
      body: JSON.stringify({ email, source: 'etherbraider', at: new Date().toISOString() }),
      signal: AbortSignal.timeout(5000),
    }).catch(() => null)
    if (!res?.ok) return Response.json({ error: 'Upstream failed' }, { status: 502 })
  }
  return Response.json({ ok: true })
}
