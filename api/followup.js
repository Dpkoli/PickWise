export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.REACT_APP_ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured on server' });
  }

  const { question, originalQuery, results } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Missing question' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        system: `You are Pickwise's assistant. Answer follow-up questions about search results. Original query: "${originalQuery}". Results: ${JSON.stringify(results)}. Answer in 2–4 sentences. Be direct, specific, and helpful. Never recommend anything illegal or unsafe.`,
        messages: [{ role: 'user', content: question }]
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: err.error?.message || 'Follow-up request failed' });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "I couldn't find an answer to that.";
    return res.status(200).json({ answer: text });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
