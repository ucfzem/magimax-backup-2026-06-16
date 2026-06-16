# MagiMax Backup — 2026-06-16

Batch AI image renaming using Gemini API via Vercel proxy.

## Files

- `frontend/index.html` — MagiMax UI (drag & drop images → Gemini → ZIP)
- `proxy/api/vision.js` — Vercel serverless function proxying Gemini API
- `proxy/package.json` — with `"type": "module"` fix
- `proxy/vercel.json` — 256MB / 30s timeout config

## Deploy proxy

```bash
cd proxy
vercel --env GEMINI_KEY=AIza...
```

## Use

1. Open https://ucfzem.github.io/MagiMax/
2. Paste proxy URL: `https://magimax-proxy.vercel.app/api/vision`
3. Drop images, click Lancer
