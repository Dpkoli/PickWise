export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.REACT_APP_ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured on server' });
  }

  const { question, originalQuery, results } = req.body || {};
  if (!question) {
    return res.status(400).json({ error: 'Missing question' });
  }

  const MODELS = ['claude-sonnet-4-5', 'claude-3-5-sonnet-20241022', 'claude-3-haiku-20240307'];

  for (const model of MODELS) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: 500,
          system: `You are Pickwise's assistant. Answer follow-up questions about search results. Original query: "${originalQuery}". Results: ${JSON.stringify(results)}. Answer in 2–4 sentences. Be direct, specific, and helpful.`,
          messages: [{ role: 'user', content: question }]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 || response.status === 404 || response.status === 403) continue;
        return res.status(response.status).json({ error: data.error?.message || 'Request failed' });
      }

      const text = data.content?.[0]?.text || "I couldn't find an answer to that.";
      return res.status(200).json({ answer: text });
    } catch (err) {
      console.error(`[Pickwise followup] Error with ${model}:`, err.message);
    }
  }

  return res.status(500).json({ error: 'Could not get a follow-up answer' });
}
