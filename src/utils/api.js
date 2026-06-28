import { CACHE_DURATION_MS } from '../config';

export async function getPickwiseResults(query, location) {
  const cacheKey = `pickwise_${query.toLowerCase().trim()}_${location.city}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const { result, ts } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_DURATION_MS) return result;
    }
  } catch (e) {}

  const response = await fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, location })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Request failed (${response.status})`);
  }

  const result = await response.json();

  try {
    sessionStorage.setItem(cacheKey, JSON.stringify({ result, ts: Date.now() }));
  } catch (e) {}

  return result;
}

export async function askFollowUp(question, originalQuery, results) {
  const response = await fetch('/api/followup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, originalQuery, results })
  });

  if (!response.ok) {
    throw new Error('Follow-up request failed');
  }

  const data = await response.json();
  return data.answer || "I couldn't find an answer to that.";
}
