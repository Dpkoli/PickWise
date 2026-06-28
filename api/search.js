export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
  }

  const { query, location } = req.body || {};
  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }

  const systemPrompt = `You are Pickwise, the world's most trusted AI recommendation engine. For any query, find and rank the 6 absolute best options: 3 near the user's location, 3 best globally.

RULES:
1. Find REAL, well-known options — use your knowledge of businesses, products and services
2. Local results must genuinely be near ${location?.city || 'the user'}, ${location?.country || ''}
3. World results = globally recognised best-in-class
4. Score 1–10 based on reviews, reputation, availability and value
5. Descriptions must state WHY it's recommended, not just what it is
6. Return ONLY valid JSON — no markdown, no code fences, no preamble

REQUIRED JSON STRUCTURE (return exactly this, nothing else):
{
  "query_understood": "one sentence confirming what was searched",
  "category": "products",
  "search_intent": "buy",
  "local_results": [
    {
      "rank": 1,
      "name": "Exact business or product name",
      "score": 9.4,
      "description": "2 sentences: what it is + why it is the best choice",
      "tags": ["tag1", "tag2", "tag3"],
      "availability": "In stock | Open now | Online",
      "cta_text": "Get directions",
      "affiliate_hint": "google_maps"
    },
    {
      "rank": 2,
      "name": "Second option",
      "score": 9.1,
      "description": "2 sentences description",
      "tags": ["tag1", "tag2"],
      "availability": "Available",
      "cta_text": "Buy now",
      "affiliate_hint": "amazon_uk"
    },
    {
      "rank": 3,
      "name": "Third option",
      "score": 8.8,
      "description": "2 sentences description",
      "tags": ["tag1", "tag2"],
      "availability": "Available",
      "cta_text": "Shop now",
      "affiliate_hint": "amazon_uk"
    }
  ],
  "world_results": [
    {
      "rank": 1,
      "name": "Best global option",
      "score": 9.7,
      "description": "2 sentences: what it is + why it is the best globally",
      "tags": ["tag1", "tag2"],
      "availability": "Ships worldwide",
      "cta_text": "Buy direct",
      "affiliate_hint": "direct"
    },
    {
      "rank": 2,
      "name": "Second global option",
      "score": 9.5,
      "description": "2 sentences description",
      "tags": ["tag1", "tag2"],
      "availability": "Available online",
      "cta_text": "Buy on Amazon",
      "affiliate_hint": "amazon_uk"
    },
    {
      "rank": 3,
      "name": "Third global option",
      "score": 9.2,
      "description": "2 sentences description",
      "tags": ["tag1", "tag2"],
      "availability": "Available online",
      "cta_text": "Shop now",
      "affiliate_hint": "amazon_uk"
    }
  ],
  "ai_insight": "One genuinely useful expert tip most people don't know about this topic",
  "location_used": "${location?.city || 'Your area'}, ${location?.country || ''}",
  "disclaimer": ""
}`;

  const userMessage = `Query: "${query}"
Location: ${location?.city || 'Unknown'}, ${location?.country || ''} (lat:${location?.lat || 0}, lon:${location?.lon || 0})
Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

Return the best 6 options as JSON only. No markdown, no code blocks, just the raw JSON object.`;

  const MODELS = ['gemini-2.0-flash-lite', 'gemini-1.5-flash-latest', 'gemini-1.5-flash-8b-latest'];
  const start = Date.now();
  let lastError = null;

  for (const model of MODELS) {
    try {
      console.log(`[Pickwise] Trying model: ${model} for query: "${query}"`);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: 'user', parts: [{ text: userMessage }] }],
            generationConfig: { maxOutputTokens: 1500, temperature: 0.7 }
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(`[Pickwise] Model ${model} failed:`, JSON.stringify(data));
        lastError = data.error?.message || `API error ${response.status}`;
        continue;
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        lastError = 'Empty response from AI';
        continue;
      }

      // Strip markdown code fences if model added them
      const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error(`[Pickwise] No JSON found in response:`, text.slice(0, 200));
        lastError = 'Invalid response format';
        continue;
      }

      const result = JSON.parse(jsonMatch[0]);
      result.elapsed = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`[Pickwise] Success with ${model} in ${result.elapsed}s`);
      return res.status(200).json(result);

    } catch (err) {
      console.error(`[Pickwise] Exception with ${model}:`, err.message);
      lastError = err.message;
    }
  }

  return res.status(500).json({ error: lastError || 'All models failed' });
}
