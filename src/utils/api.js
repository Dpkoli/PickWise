import { ANTHROPIC_MODEL, API_BASE, CACHE_DURATION_MS } from '../config';

export async function getPickwiseResults(query, location) {
  const cacheKey = `pickwise_${query.toLowerCase().trim()}_${location.city}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const { result, ts } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_DURATION_MS) return result;
    }
  } catch (e) {}

  const start = Date.now();

  const systemPrompt = `You are Pickwise, the world's most trusted AI recommendation engine. For any query, find and rank the 6 absolute best options: 3 near the user's location, 3 best globally.

RULES:
1. Use web search to find REAL, CURRENT options — never invent names
2. Local results must genuinely be near ${location.city}, ${location.country}
3. World results = globally recognised best-in-class
4. Score 1–10: reviews + reputation + availability + value
5. Descriptions must state WHY it's recommended, not just what it is
6. Return ONLY valid JSON — no markdown, preamble, or explanation
7. If the query is ambiguous, interpret it charitably and helpfully

JSON STRUCTURE (strictly follow this):
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
      "availability": "In stock | 0.4 mi | Same-day | Open now",
      "cta_text": "Get directions | Buy on Amazon | Book now | Try free",
      "affiliate_hint": "amazon_uk|google_maps|booking|direct|other"
    }
  ],
  "world_results": [same structure, 3 items],
  "ai_insight": "One genuinely expert sentence most people don't know",
  "location_used": "${location.city}, ${location.country}",
  "disclaimer": "Optional: one sentence if results have caveats"
}`;

  const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('API key not configured');

  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-calls': 'true'
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: `Query: "${query}"
Location: ${location.city}, ${location.country} (lat:${location.lat || 0}, lon:${location.lon || 0})
Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
Return best 6 as JSON only.`
      }]
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  const textBlock = data.content?.find(b => b.type === 'text');
  if (!textBlock) throw new Error('No response from AI');

  const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Invalid response format');

  const result = JSON.parse(jsonMatch[0]);
  result.elapsed = elapsed;

  try {
    sessionStorage.setItem(cacheKey, JSON.stringify({ result, ts: Date.now() }));
  } catch (e) {}

  return result;
}

export async function askFollowUp(question, originalQuery, results) {
  const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('API key not configured');

  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-calls': 'true'
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 500,
      system: `You are Pickwise's assistant. Answer follow-up questions about search results. Original query: "${originalQuery}". Results: ${JSON.stringify(results)}. Answer in 2–4 sentences. Be direct, specific, and helpful. Never recommend anything illegal or unsafe.`,
      messages: [{ role: 'user', content: question }]
    })
  });

  if (!response.ok) throw new Error('Follow-up request failed');
  const data = await response.json();
  return data.content?.[0]?.text || "I couldn't find an answer to that.";
}
