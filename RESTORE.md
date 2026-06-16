# Restore MagiMax from scratch

## 1. Deploy proxy
```bash
git clone https://github.com/ucfzem/magimax-vision-proxy
cd magimax-vision-proxy
npm i -g vercel
vercel --env GEMINI_KEY=YOUR_GEMINI_KEY
```

## 2. Disable Vercel Auth
Settings → https://vercel.com/ucfzem-s-projects/magimax-proxy/settings
→ Deployment Protection → Vercel Authentication → Disabled

Then redeploy: `vercel --prod`

## 3. Use the app
- Open https://ucfzem.github.io/MagiMax/
- Paste `https://magimax-proxy.vercel.app/api/vision` in proxy URL field
- Drop images, click Lancer

## Troubleshooting
- 404 → Check "type":"module" in package.json, check Vercel Auth is disabled
- 429 → Quota exhausted, get new key from aistudio.google.com/apikey
- Failed to fetch → Check CORS, proxy URL, deployment status
