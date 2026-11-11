# etherbraider

Next.js 15 (App Router) · Tailwind CSS 4 · Motion · Lenis · React Three Fiber

```
cp .env.example .env.local
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

- `app/page.js` – all sections and copy
- `app/globals.css` – theme tokens (colours, fonts, keyframes)
- `components/` – loader, live block number, page transition, lead form, particle scene, hero parallax
- `app/api/lead` – validates the email and forwards the lead to `LEAD_WEBHOOK_URL`

The loader shows once per browser session. Motion is reduced automatically for users with "reduce motion" enabled.

Security: `next.config.mjs` sets CSP, HSTS and frame/nosniff/referrer/permissions headers. `app/api/lead` is same-origin only, rate-limited (5/min/IP) and forwards only the email. `.env*` files are git-ignored.
