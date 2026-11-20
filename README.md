# Marcelo Rangel — Portfolio

Personal portfolio. Next.js (App Router) + TypeScript + Tailwind CSS, exported as a static site.

- All copy lives in [`lib/content.ts`](lib/content.ts); components only render it.
- `npm run dev` — local development
- `npm run build` — static export to `out/` (deploy that folder anywhere)

## Deploy
- **Vercel:** import the repository; the Next.js preset works as is.
- **bohr.io:** build command `npm run build`, output directory `out`.

### Cloudflare Pages
Workers & Pages → Create → "Continue to Pages" → Connect to Git, then:

| Field | Value |
|---|---|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Environment variable | `NODE_VERSION` = `22` |
