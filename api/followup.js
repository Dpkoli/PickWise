export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured on server' });
  }

  const { question, originalQuery, results } = req.body || {};
  if (!question) {
    return res.status(400).json({ error: 'Missing question' });
  }

  const systemPrompt = `You are Pickwise's assistant. Answer follow-up questions about search results concisely and helpfully. Original query: "${originalQuery}". Results context: ${JSON.stringify(results)}. Answer in 2–4 sentences. Be direct, specific, and helpful. Never recommend anything illegal or unsafe.`;

  const MODELS = ['llama-3.3-70b-versatile', 'mixtral-8x7b-32768', 'llama-3.1-8b-instant'];

  for (const model of MODELS) {
    try {
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
            { role: 'user', content: question }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      const data = await response.json();
      if (!response.ok) continue;

      const text = data.choices?.[0]?.message?.content;
      if (!text) continue;

      return res.status(200).json({ answer: text });
    } catch (err) {
      console.error(`[Pickwise followup] Error with ${model}:`, err.message);
    }
  }

  return res.status(500).json({ error: 'Could not get a follow-up answer' });
}
