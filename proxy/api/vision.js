export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST only' });
    return;
  }

  const key = process.env.GEMINI_KEY || process.env.GOOGLE_VISION_KEY;
  if (!key) {
    res.status(500).json({ error: 'GEMINI_KEY not configured' });
    return;
  }

  const { image } = req.body;
  if (!image) {
    res.status(400).json({ error: 'image field required (base64)' });
    return;
  }

  const model = 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

  const prompt = `Describe this image for a filename in French.
Return ONLY: [sujet_principal]-[contexte]-[detail_couleur]
Use lowercase, hyphens, no accents.
Example: "chat-noir-regarde-fenetre"`;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inline_data: { mime_type: 'image/jpeg', data: image } }
          ]
        }]
      })
    });

    const data = await resp.json();
    if (!resp.ok) {
      res.status(resp.status).json({ error: data.error?.message || 'Gemini API error' });
      return;
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.status(200).json({ description: text.trim().split('\n')[0] });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
}
