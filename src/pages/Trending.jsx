import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TRENDING_CATEGORIES } from '../utils/queries';

const CATEGORY_COLORS = [
  { bg: '#E6FBF3', color: '#09865A', border: '#0EB87B' },
  { bg: '#EFF6FF', color: '#1D4ED8', border: '#3B82F6' },
  { bg: '#EEEEFF', color: '#3A3CC9', border: '#5254E8' },
  { bg: '#FFF7ED', color: '#C2410C', border: '#F97316' },
  { bg: '#F0FDF4', color: '#166534', border: '#22C55E' },
  { bg: '#FDF4FF', color: '#7E22CE', border: '#A855F7' },
];

export default function Trending() {
  const navigate = useNavigate();

  function handleQuery(q) {
    navigate(`/results?q=${encodeURIComponent(q)}`);
  }

  return (
    <div style={{ background: '#F5F5FA', minHeight: '100vh' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(10,10,18,0.08)', padding: '52px 24px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 38, color: '#0A0A12', marginBottom: 12 }}>
            Trending searches
          </h1>
          <p style={{ fontSize: 16, color: '#3D3D52', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
            Popular topics — click any to get instant AI-powered recommendations near you + worldwide.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
        {TRENDING_CATEGORIES.map((cat, catIdx) => {
          const palette = CATEGORY_COLORS[catIdx % CATEGORY_COLORS.length];
          return (
            <div key={catIdx} style={{ marginBottom: 48 }}>
              <h2 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 22, color: '#0A0A12', marginBottom: 20
              }}>
                {cat.name}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
                {cat.queries.map((q, qi) => (
                  <button
                    key={qi}
                    onClick={() => handleQuery(q)}
                    style={{
                      background: '#fff', border: '1px solid rgba(10,10,18,0.10)',
                      borderRadius: 10, padding: '12px 16px', textAlign: 'left',
                      fontSize: 14, color: '#0A0A12', fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer', transition: 'background 150ms, border-color 150ms, color 150ms',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                      position: 'relative'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = palette.bg;
                      e.currentTarget.style.borderColor = palette.border;
                      e.currentTarget.style.color = palette.color;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.borderColor = 'rgba(10,10,18,0.10)';
                      e.currentTarget.style.color = '#0A0A12';
                    }}
                  >
                    <span>{q}</span>
                    <span style={{ fontSize: 12, color: '#8888A0', flexShrink: 0 }}>→</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        <p style={{ textAlign: 'center', fontSize: 13, color: '#8888A0', fontFamily: 'Inter, sans-serif', marginTop: 24 }}>
          Searches are examples. Pickwise works for any question.
        </p>
      </div>
    </div>
  );
}
