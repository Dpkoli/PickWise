import React from 'react';
import ResultCard from './ResultCard';

export default function QuadrantPanel({ type, city, results = [], query, category }) {
  const isLocal = type === 'local';
  const accentColor = isLocal ? '#0EB87B' : '#5254E8';
  const tintColor = isLocal ? '#E6FBF3' : '#EEEEFF';

  return (
    <div>
      {/* Column Header */}
      <div style={{
        background: tintColor, borderRadius: 8, padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isLocal ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          )}
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: '#0A0A12' }}>
            {isLocal ? `3 top picks for ${city || 'you'}` : '3 best worldwide'}
          </span>
        </div>
        <span style={{ fontSize: 12, color: '#8888A0', fontFamily: 'Inter, sans-serif' }}>3 picks</span>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {results.map((item, i) => (
          <ResultCard
            key={i}
            rank={item.rank || i + 1}
            name={item.name}
            score={item.score}
            scores={item.scores}
            bestFor={item.best_for}
            description={item.description}
            tags={item.tags || []}
            ctaText={item.cta_text}
            affiliateHint={item.affiliate_hint}
            hasPhysicalStore={item.has_physical_store}
            mapsQuery={item.maps_query}
            type={type}
            isTop={i === 0}
            query={query}
            category={category}
            animationDelay={i * 80}
          />
        ))}
      </div>
    </div>
  );
}
