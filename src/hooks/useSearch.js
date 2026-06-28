import { useState, useCallback } from 'react';
import { getPickwiseResults } from '../utils/api';
import { filterQuery } from '../utils/contentFilter';

export default function useSearch() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blocked, setBlocked] = useState(null);
  const [elapsed, setElapsed] = useState(null);

  const search = useCallback(async (query, location) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const filtered = filterQuery(trimmed);
    if (filtered.blocked) {
      setBlocked(filtered.message);
      return;
    }

    setBlocked(null);
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await getPickwiseResults(trimmed, location);
      setResults(data);
      setElapsed(data.elapsed);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResults(null);
    setError(null);
    setBlocked(null);
    setElapsed(null);
  }, []);

  return { results, loading, error, blocked, elapsed, search, reset };
}
