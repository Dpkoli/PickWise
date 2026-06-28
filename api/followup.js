export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
  }

  const { question, originalQuery, results } = req.body || {};
  if (!question) {
    return res.status(400).json({ error: 'Missing question' });
  }

  const systemPrompt = `You are Pickwise's assistant. Answer follow-up questions about search results concisely and helpfully. Original query: "${originalQuery}". Results context: ${JSON.stringify(results)}. Answer in 2–4 sentences. Be direct, specific, and helpful. Never recommend anything illegal or unsafe.`;

  const MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-8b'];

  for (const model of MODELS) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: 'user', parts: [{ text: question }] }],
            generationConfig: { maxOutputTokens: 500, temperature: 0.7 }
          })
        }
      );

      const data = await response.json();
      if (!response.ok) continue;

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) continue;

      return res.status(200).json({ answer: text });
    } catch (err) {
      console.error(`[Pickwise followup] Error with ${model}:`, err.message);
    }
  }

  return res.status(500).json({ error: 'Could not get a follow-up answer' });
}
