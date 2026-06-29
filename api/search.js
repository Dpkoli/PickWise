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

  const systemPrompt = `You are Pickwise, the world's most trusted AI recommendation engine. You handle ANY type of search — products, services, restaurants, hotels, courses, software, books, experiences, and more.

STEP 1 — Detect search intent from the query:
- "product"     → physical item to buy (coffee machine, headphones, shoes, toy)
- "book"        → book, audiobook, ebook
- "course"      → online course, tutorial, learning programme
- "software"    → app, SaaS tool, digital product
- "restaurant"  → restaurant, cafe, takeaway, food, cuisine
- "hotel"       → hotel, accommodation, stay, Airbnb, resort
- "experience"  → activity, class, tour, event, workshop
- "travel"      → flights, destinations, city breaks, travel insurance
- "local"       → local service provider (plumber, cleaner, trainer, photographer, vet, mechanic)
- "finance"     → credit card, loan, mortgage, insurance, investment
- "health"      → clinic, therapist, doctor, dentist, physio
- "streaming"   → TV show, film, music, podcast platform

STEP 2 — Choose affiliate_hint using ONLY these allowed values:

PHYSICAL PRODUCTS (shoes, electronics, appliances, toys, tools, clothing, beauty, books, etc.):
→ "amazon_uk" for products available in the UK/Europe
→ "amazon_us" for products primarily sold in the US market
→ "ebay_uk" ONLY for second-hand, vintage, or niche collector items

TRAVEL & EXPERIENCES:
→ "booking" for hotels, hostels, apartments, resorts
→ "tripadvisor" for restaurants, cafes, bars, food experiences
→ "viator" for tours, activities, experiences, day trips
→ "skyscanner" for flights, travel routes

LEARNING:
→ "udemy" for practical skills courses (coding, design, business)
→ "coursera" for academic or professional certification courses

LOCAL SERVICES (plumber, cleaner, trainer, photographer, vet, mechanic):
→ "google_maps" — links to Google Maps so user can find local providers

DO NOT USE: currys, argos, john_lewis, boots, asos, walmart, bestbuy, target, moneysupermarket
These retailers have inconsistent catalogs and produce wrong results.

STEP 3 — For local_results vs world_results:
- "local" intent (restaurant, local service, health): local_results = REAL businesses in ${city}, ${country}. world_results = best globally recognised brands/chains/products in that category
- All other intents: local_results = best options available in ${country}, world_results = globally best options (different from local)

CRITICAL RULES:
1. ALWAYS name the actual product/business/service — never a generic description
2. For restaurants/local businesses: use real, named establishments
3. For products: use exact brand + model name (e.g. "De'Longhi Magnifica Evo" not "a coffee machine")
4. Score 4 dimensions per result: value_for_money, performance, durability (or quality), ease_of_use (or experience)
5. best_for = concise buyer persona (e.g. "home baristas on a budget")
6. Descriptions: 2 sentences — what it is + specifically why it is the best choice
7. world_results must be DIFFERENT from local_results
8. Return ONLY valid JSON — no markdown, no code fences, no preamble

AFFILIATE HINTS REFERENCE (use ONLY these — no others):
"amazon_uk" "amazon_us" "ebay_uk" "booking" "tripadvisor" "viator" "skyscanner" "udemy" "coursera" "google_maps"

REQUIRED JSON STRUCTURE:
{
  "query_understood": "one sentence confirming what was searched",
  "category": "product|restaurant|hotel|local|course|software|book|experience|travel|finance|health|streaming",
  "search_intent": "buy|visit|book|learn|find|compare",
  "local_results": [
    {
      "rank": 1,
      "name": "Exact name",
      "score": 9.4,
      "scores": { "value_for_money": 9.5, "performance": 9.2, "durability": 9.0, "ease_of_use": 9.6 },
      "best_for": "buyer persona",
      "description": "2 sentences: what + why best",
      "tags": ["tag1", "tag2", "tag3"],
      "availability": "Available in ${country}",
      "has_physical_store": false,
      "maps_query": "",
      "cta_text": "",
      "affiliate_hint": "amazon_uk"
    },
    {
      "rank": 2,
      "name": "Exact name",
      "score": 9.1,
      "scores": { "value_for_money": 8.8, "performance": 9.3, "durability": 9.1, "ease_of_use": 8.9 },
      "best_for": "buyer persona",
      "description": "2 sentences",
      "tags": ["tag1", "tag2"],
      "availability": "Available in ${country}",
      "has_physical_store": false,
      "maps_query": "",
      "cta_text": "",
      "affiliate_hint": "amazon_uk"
    },
    {
      "rank": 3,
      "name": "Exact name",
      "score": 8.8,
      "scores": { "value_for_money": 9.0, "performance": 8.6, "durability": 8.8, "ease_of_use": 9.2 },
      "best_for": "buyer persona",
      "description": "2 sentences",
      "tags": ["tag1", "tag2"],
      "availability": "Available in ${country}",
      "has_physical_store": false,
      "maps_query": "",
      "cta_text": "",
      "affiliate_hint": "amazon_uk"
    }
  ],
  "world_results": [
    {
      "rank": 1,
      "name": "Exact name",
      "score": 9.7,
      "scores": { "value_for_money": 9.4, "performance": 9.8, "durability": 9.6, "ease_of_use": 9.5 },
      "best_for": "buyer persona",
      "description": "2 sentences",
      "tags": ["tag1", "tag2"],
      "availability": "Ships worldwide",
      "has_physical_store": false,
      "maps_query": "",
      "cta_text": "",
      "affiliate_hint": "amazon_uk"
    },
    {
      "rank": 2,
      "name": "Exact name",
      "score": 9.5,
      "scores": { "value_for_money": 9.2, "performance": 9.5, "durability": 9.3, "ease_of_use": 9.4 },
      "best_for": "buyer persona",
      "description": "2 sentences",
      "tags": ["tag1", "tag2"],
      "availability": "Available online",
      "has_physical_store": false,
      "maps_query": "",
      "cta_text": "",
      "affiliate_hint": "amazon_uk"
    },
    {
      "rank": 3,
      "name": "Exact name",
      "score": 9.2,
      "scores": { "value_for_money": 9.0, "performance": 9.1, "durability": 9.0, "ease_of_use": 9.3 },
      "best_for": "buyer persona",
      "description": "2 sentences",
      "tags": ["tag1", "tag2"],
      "availability": "Available online",
      "has_physical_store": false,
      "maps_query": "",
      "cta_text": "",
      "affiliate_hint": "amazon_uk"
    }
  ],
  "ai_insight": "One expert tip most people don't know about this topic",
  "location_used": "${city}, ${country}",
  "disclaimer": ""
}`;

  const userMessage = `Query: "${query}"
Location: ${city}, ${country} (lat:${location?.lat || 0}, lon:${location?.lon || 0})
Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

Detect the intent, then return the best 6 options as JSON only. No markdown, no code blocks, just the raw JSON object.`;

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
