import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useSearch from '../hooks/useSearch';
import useLocation from '../hooks/useLocation';
import SearchBar from '../components/SearchBar';
import QuadrantPanel from '../components/QuadrantPanel';
import AiInsightBar from '../components/AiInsightBar';
import LoadingState from '../components/LoadingState';
import AffiliateDisclosureBanner from '../components/AffiliateDisclosureBanner';
import CategoryDisclaimer from '../components/CategoryDisclaimer';
import FollowUpChat from '../components/FollowUpChat';
import AdSlot from '../components/AdSlot';
import { detectCategory } from '../utils/contentFilter';

export default function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const { results, loading, error, blocked, elapsed, search } = useSearch();
  const location = useLocation();
  const didSearch = useRef(false);

  useEffect(() => {
    document.title = query
      ? `Best ${query} near ${location.city || 'you'} + worldwide | Pickwise`
      : 'Pickwise — Smarter Picks. Every Time.';
  }, [query, location.city]);

  // Snapshot location into a ref so we can read it inside the effect
  // without making location object identity a dependency (avoids infinite loop)
  const locationRef = useRef(location);
  useEffect(() => { locationRef.current = location; }, [location]);

  useEffect(() => {
    if (!query) return;
    if (location.loading) return;
    if (didSearch.current) return;
    didSearch.current = true;
    search(query, locationRef.current);
  }, [query, location.loading]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset didSearch when query changes so a new search fires
  useEffect(() => {
    didSearch.current = false;
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleNewSearch(q) {
    navigate(`/results?q=${encodeURIComponent(q)}`);
  }

  const category = results?.category || detectCategory(query);
  const locationDisplay = location.loading ? 'Detecting...' : location.city || '';

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 60, background: '#F5F5FA', fontFamily: 'Inter, sans-serif' }}>

      {/* Sticky search header */}
      <div style={{
        background: '#fff', borderBottom: '1px solid rgba(10,10,18,0.08)',
        padding: '12px 24px', position: 'sticky', top: 60, zIndex: 50
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <SearchBar initialValue={query} locationDisplay={locationDisplay} onSearch={handleNewSearch} />
          </div>
          {elapsed && (
            <span style={{ fontSize: 11, background: '#F0F0F8', borderRadius: 20, padding: '4px 12px', color: '#8888A0', whiteSpace: 'nowrap', flexShrink: 0 }}>
              ⚡ {elapsed} sec
            </span>
          )}
        </div>
      </div>

      {loading && <LoadingState city={location.city} />}

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px' }}>

        {/* Blocked state */}
        {blocked && !loading && (
          <div style={{
            background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 12,
            padding: '24px', textAlign: 'center', color: '#92400E'
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🚫</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>We can't search for that</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6 }}>{blocked} Please try a different search.</p>
            <button
              onClick={() => navigate('/')}
              style={{ marginTop: 16, background: '#5254E8', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
            >← Back to search</button>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div style={{
            background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 12,
            padding: '24px', textAlign: 'center', color: '#7F1D1D'
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>We couldn't find results right now</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6 }}>This sometimes happens when the AI is busy.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
              <button
                onClick={() => { didSearch.current = false; search(query, location); }}
                style={{ background: '#5254E8', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >Try again →</button>
              <button
                onClick={() => navigate('/')}
                style={{ background: '#fff', color: '#3D3D52', border: '1px solid rgba(10,10,18,0.15)', borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >Try rephrasing →</button>
            </div>
          </div>
        )}

        {/* Results */}
        {results && !loading && (
          <>
            {/* Query bubble */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                display: 'inline-block', background: '#EEEDFE', color: '#3A3CC9',
                borderRadius: '12px 12px 12px 0', padding: '12px 16px',
                fontSize: 14, fontWeight: 500, maxWidth: '100%', lineHeight: 1.5
              }}>
                {results.query_understood || query}
              </div>
              <p style={{ fontSize: 11, color: '#8888A0', marginTop: 6 }}>
                Pickwise AI searched 200+ sources · {elapsed} seconds
              </p>
            </div>

            {/* Mandatory affiliate disclosure */}
            <AffiliateDisclosureBanner />

            {/* Category disclaimer (health / legal / financial) */}
            <CategoryDisclaimer category={category} />

            {/* Two-quadrant grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 0 }}>
              <QuadrantPanel
                type="local"
                city={location.city || results.location_used}
                results={results.local_results || []}
                query={query}
                category={category}
              />
              <QuadrantPanel
                type="world"
                city={location.city}
                results={results.world_results || []}
                query={query}
                category={category}
              />
            </div>

            {/* AI Insight */}
            {results.ai_insight && (
              <AiInsightBar insight={results.ai_insight} />
            )}

            {/* Follow-up chat */}
            <FollowUpChat originalQuery={query} results={results} />

            {/* Ad slot */}
            <div style={{ marginTop: 24 }}>
              <AdSlot size="responsive" />
            </div>

            {/* Share */}
            {navigator.share && (
              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <button
                  onClick={() => navigator.share({
                    title: `Best ${query} — Pickwise`,
                    text: `I just found the best ${query} using Pickwise — 3 near me + 3 worldwide`,
                    url: window.location.href
                  })}
                  style={{
                    background: '#F5F5FA', color: '#3D3D52', border: '1px solid rgba(10,10,18,0.12)',
                    borderRadius: 20, padding: '8px 20px', fontSize: 13, fontWeight: 500,
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif'
                  }}
                >Share these results</button>
              </div>
            )}

            {/* Footer disclaimer */}
            <p style={{ fontSize: 12, color: '#8888A0', textAlign: 'center', marginTop: 32, lineHeight: 1.6, maxWidth: 720, margin: '32px auto 0' }}>
              Pickwise recommendations are generated by artificial intelligence using publicly available data. We do not verify, endorse, or guarantee any business, product, or service listed. Always conduct your own research before making a purchase or booking. All brand names are trademarks of their respective owners.
            </p>
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          div[style*="gridTemplateColumns: '1fr 1fr'"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
