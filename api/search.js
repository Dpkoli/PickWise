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

  const country = location?.country || 'United Kingdom';
  const city = location?.city || 'your city';

  const systemPrompt = `You are Pickwise, the world's most trusted AI recommendation engine. For any query, recommend the 6 best PRODUCTS or SERVICES — scored across 4 dimensions that users care about most.

CRITICAL RULES:
1. ALWAYS recommend the actual product/service by its exact market name (e.g. "De'Longhi Magnifica Evo" — never "a coffee machine")
2. NEVER recommend a shop or retailer as the product itself
3. local_results = 3 best products/services available in ${country}, tailored to local pricing and availability
4. world_results = 3 globally best-in-class products — must be DIFFERENT from local_results
5. If query is for a LOCAL SERVICE (restaurant, plumber, gym), local_results CAN name real local businesses
6. For each result, score 4 dimensions out of 10: value_for_money, performance, durability, ease_of_use
7. Set "has_physical_store": true ONLY if the product is primarily sold in physical retail stores in ${country}
8. Set "maps_query" to the best physical store name + city to find it (e.g. "Currys ${city}") — only when has_physical_store is true
9. Set affiliate_hint to the BEST place to buy this specific product:
   - "amazon_uk"    → best bought on Amazon UK (amazon.co.uk)
   - "amazon_us"    → best bought on Amazon US (amazon.com)
   - "currys"       → available at Currys (UK electronics)
   - "argos"        → available at Argos (UK general retail)
   - "john_lewis"   → available at John Lewis (UK premium retail)
   - "walmart"      → available at Walmart (US)
   - "bestbuy"      → available at Best Buy (US electronics)
   - "ebay_uk"      → best found on eBay UK
   - "google_shopping" → compare prices across multiple retailers
   - "direct"       → brand sells direct from its own website
10. best_for = short phrase describing the ideal buyer (e.g. "budget-conscious home bakers")
11. Return ONLY valid JSON — no markdown, no code fences, no preamble

REQUIRED JSON STRUCTURE:
{
  "query_understood": "one sentence confirming what was searched",
  "category": "products",
  "search_intent": "buy",
  "local_results": [
    {
      "rank": 1,
      "name": "Exact product name",
      "score": 9.4,
      "scores": { "value_for_money": 9.5, "performance": 9.2, "durability": 9.0, "ease_of_use": 9.6 },
      "best_for": "short buyer persona phrase",
      "description": "2 sentences: specific features + why it is the best choice in ${country}",
      "tags": ["tag1", "tag2", "tag3"],
      "availability": "Available in ${country}",
      "has_physical_store": false,
      "maps_query": "",
      "cta_text": "Buy on Amazon",
      "affiliate_hint": "amazon_uk"
    },
    {
      "rank": 2,
      "name": "Second product name",
      "score": 9.1,
      "scores": { "value_for_money": 8.8, "performance": 9.3, "durability": 9.1, "ease_of_use": 8.9 },
      "best_for": "short buyer persona phrase",
      "description": "2 sentences description",
      "tags": ["tag1", "tag2"],
      "availability": "Available in ${country}",
      "has_physical_store": true,
      "maps_query": "Currys ${city}",
      "cta_text": "Buy at Currys",
      "affiliate_hint": "currys"
    },
    {
      "rank": 3,
      "name": "Third product name",
      "score": 8.8,
      "scores": { "value_for_money": 9.0, "performance": 8.6, "durability": 8.8, "ease_of_use": 9.2 },
      "best_for": "short buyer persona phrase",
      "description": "2 sentences description",
      "tags": ["tag1", "tag2"],
      "availability": "Available online",
      "has_physical_store": false,
      "maps_query": "",
      "cta_text": "Buy direct",
      "affiliate_hint": "direct"
    }
  ],
  "world_results": [
    {
      "rank": 1,
      "name": "Best global product name",
      "score": 9.7,
      "scores": { "value_for_money": 9.4, "performance": 9.8, "durability": 9.6, "ease_of_use": 9.5 },
      "best_for": "short buyer persona phrase",
      "description": "2 sentences: specific features + why it is globally the best",
      "tags": ["tag1", "tag2"],
      "availability": "Ships worldwide",
      "has_physical_store": false,
      "maps_query": "",
      "cta_text": "Buy direct",
      "affiliate_hint": "direct"
    },
    {
      "rank": 2,
      "name": "Second global product name",
      "score": 9.5,
      "scores": { "value_for_money": 9.2, "performance": 9.5, "durability": 9.3, "ease_of_use": 9.4 },
      "best_for": "short buyer persona phrase",
      "description": "2 sentences description",
      "tags": ["tag1", "tag2"],
      "availability": "Available online",
      "has_physical_store": false,
      "maps_query": "",
      "cta_text": "Buy on Amazon",
      "affiliate_hint": "amazon_us"
    },
    {
      "rank": 3,
      "name": "Third global product name",
      "score": 9.2,
      "scores": { "value_for_money": 9.0, "performance": 9.1, "durability": 9.0, "ease_of_use": 9.3 },
      "best_for": "short buyer persona phrase",
      "description": "2 sentences description",
      "tags": ["tag1", "tag2"],
      "availability": "Available online",
      "has_physical_store": false,
      "maps_query": "",
      "cta_text": "Compare prices",
      "affiliate_hint": "google_shopping"
    }
  ],
  "ai_insight": "One genuinely useful expert tip most people don't know about this topic",
  "location_used": "${city}, ${country}",
  "disclaimer": ""
}`;

  const userMessage = `Query: "${query}"
Location: ${city}, ${country} (lat:${location?.lat || 0}, lon:${location?.lon || 0})
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
          max_tokens: 2000,
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
