export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured on server' });
  }

  const { query, location } = req.body || {};
  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }

  const systemPrompt = `You are Pickwise, the world's most trusted AI recommendation engine. For any query, recommend the 6 best PRODUCTS, SERVICES, or EXPERIENCES — never shops, stores, or retailers.

CRITICAL RULES:
1. ALWAYS recommend the actual product/service/experience by name — NEVER a store or retailer (e.g. say "De'Longhi Magnifica Evo" NOT "Currys PC World")
2. For "local_results": recommend the 3 best products/services that are most popular, well-reviewed, and available in ${location?.country || 'the user\'s country'}. Consider local pricing, regulations, and availability.
3. For "world_results": the 3 globally best-rated products for this query — these must be DIFFERENT products from local_results
4. If the query is for a LOCAL SERVICE (e.g. "best plumber", "best restaurant near me"), local_results CAN name real local businesses
5. Score 1–10 based on verified reviews, reputation, value, and fit
6. Descriptions must state specific features/pros — WHY it is the best choice, not just what it is
7. Use VARIED affiliate_hint values — do not use "amazon_uk" for every result. Choose the most appropriate:
   - "amazon_uk" → product available on Amazon UK
   - "amazon_us" → product best found on Amazon US
   - "google_shopping" → compare prices across retailers
   - "direct" → brand sells direct from official website
   - "brand_website" → find on brand's own site
   - "booking" → hotels/travel
   - "google_maps" → local place/service
8. Return ONLY valid JSON — no markdown, no code fences, no preamble

REQUIRED JSON STRUCTURE (return exactly this, nothing else):
{
  "query_understood": "one sentence confirming what was searched",
  "category": "products",
  "search_intent": "buy",
  "local_results": [
    {
      "rank": 1,
      "name": "Exact product name (e.g. De'Longhi Magnifica Evo)",
      "score": 9.4,
      "description": "2 sentences: specific features + why it is the best choice for users in ${location?.country || 'this country'}",
      "tags": ["tag1", "tag2", "tag3"],
      "availability": "Available in ${location?.country || 'your country'}",
      "cta_text": "Buy on Amazon",
      "affiliate_hint": "amazon_uk"
    },
    {
      "rank": 2,
      "name": "Second product name",
      "score": 9.1,
      "description": "2 sentences description",
      "tags": ["tag1", "tag2"],
      "availability": "Available online",
      "cta_text": "Compare prices",
      "affiliate_hint": "google_shopping"
    },
    {
      "rank": 3,
      "name": "Third product name",
      "score": 8.8,
      "description": "2 sentences description",
      "tags": ["tag1", "tag2"],
      "availability": "Available online",
      "cta_text": "Buy direct",
      "affiliate_hint": "direct"
    }
  ],
  "world_results": [
    {
      "rank": 1,
      "name": "Best global product name",
      "score": 9.7,
      "description": "2 sentences: specific features + why it is the globally best",
      "tags": ["tag1", "tag2"],
      "availability": "Ships worldwide",
      "cta_text": "Buy direct",
      "affiliate_hint": "direct"
    },
    {
      "rank": 2,
      "name": "Second global product name",
      "score": 9.5,
      "description": "2 sentences description",
      "tags": ["tag1", "tag2"],
      "availability": "Available online",
      "cta_text": "Buy on Amazon",
      "affiliate_hint": "amazon_us"
    },
    {
      "rank": 3,
      "name": "Third global product name",
      "score": 9.2,
      "description": "2 sentences description",
      "tags": ["tag1", "tag2"],
      "availability": "Available online",
      "cta_text": "Compare prices",
      "affiliate_hint": "google_shopping"
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

  const MODELS = ['llama-3.3-70b-versatile', 'mixtral-8x7b-32768', 'llama-3.1-8b-instant'];
  const start = Date.now();
  let lastError = null;

  for (const model of MODELS) {
    try {
      console.log(`[Pickwise] Trying model: ${model} for query: "${query}"`);

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 1500,
          temperature: 0.2
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(`[Pickwise] Model ${model} failed:`, JSON.stringify(data));
        lastError = data.error?.message || `API error ${response.status}`;
        continue;
      }

      const text = data.choices?.[0]?.message?.content;
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
