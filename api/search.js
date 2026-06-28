export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.REACT_APP_ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('[Pickwise] ANTHROPIC_API_KEY is not set');
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured on server' });
  }

  const { query, location } = req.body || {};
  if (!query) {
    console.error('[Pickwise] Missing query in request body:', req.body);
    return res.status(400).json({ error: 'Missing query' });
  }

  const systemPrompt = `You are Pickwise, the world's most trusted AI recommendation engine. For any query, find and rank the 6 absolute best options: 3 near the user's location, 3 best globally.

RULES:
1. Find REAL, CURRENT options — never invent names
2. Local results must genuinely be near ${location?.city || 'the user'}, ${location?.country || ''}
3. World results = globally recognised best-in-class
4. Score 1–10: reviews + reputation + availability + value
5. Descriptions must state WHY it's recommended, not just what it is
6. Return ONLY valid JSON — no markdown, preamble, or explanation

JSON STRUCTURE:
{
  "query_understood": "one sentence confirming what was searched",
  "category": "products|services|places|digital|health|legal|financial|mixed",
  "search_intent": "buy|find|learn|hire|visit",
  "local_results": [
    {
      "rank": 1,
      "name": "Exact name",
      "score": 9.4,
      "description": "2 sentences: what + why best choice",
      "tags": ["tag1", "tag2", "tag3"],
      "availability": "In stock | Open now | Online",
      "cta_text": "Get directions | Buy on Amazon | Book now | Try free",
      "affiliate_hint": "amazon_uk|google_maps|booking|direct|other"
    }
  ],
  "world_results": [
    {
      "rank": 1,
      "name": "Exact name",
      "score": 9.7,
      "description": "2 sentences: what + why best choice",
      "tags": ["tag1", "tag2"],
      "availability": "Ships worldwide | Available online",
      "cta_text": "Buy direct | Buy on Amazon",
      "affiliate_hint": "amazon_uk|direct|other"
    }
  ],
  "ai_insight": "One genuinely expert sentence most people don't know",
  "location_used": "${location?.city || 'Your area'}, ${location?.country || ''}",
  "disclaimer": "Optional: one sentence if results have caveats"
}`;

  // Try models in order from newest to most reliable fallback
  const MODELS = [
    'claude-sonnet-4-5',
    'claude-3-5-sonnet-20241022',
    'claude-3-haiku-20240307',
  ];

  const start = Date.now();
  let lastError = null;

  for (const model of MODELS) {
    try {
      console.log(`[Pickwise] Trying model: ${model} for query: "${query}"`);

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: 1500,
          system: systemPrompt,
          messages: [{
            role: 'user',
            content: `Query: "${query}"
Location: ${location?.city || 'Unknown'}, ${location?.country || ''} (lat:${location?.lat || 0}, lon:${location?.lon || 0})
Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
Return best 6 as JSON only.`
          }]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(`[Pickwise] Model ${model} failed:`, JSON.stringify(data));
        lastError = data.error?.message || `API error ${response.status}`;
        // Only try next model on model-not-found or permission errors
        if (response.status === 400 || response.status === 404 || response.status === 403) {
          continue;
        }
        return res.status(response.status).json({ error: lastError });
      }

      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`[Pickwise] Success with model ${model} in ${elapsed}s`);

      const textBlock = data.content?.find(b => b.type === 'text');
      if (!textBlock) {
        return res.status(500).json({ error: 'No text response from AI' });
      }

      const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return res.status(500).json({ error: 'Invalid response format from AI' });
      }

      const result = JSON.parse(jsonMatch[0]);
      result.elapsed = elapsed;
      return res.status(200).json(result);

    } catch (err) {
      console.error(`[Pickwise] Exception with model ${model}:`, err.message);
      lastError = err.message;
    }
  }

  return res.status(500).json({ error: lastError || 'All models failed' });
}
