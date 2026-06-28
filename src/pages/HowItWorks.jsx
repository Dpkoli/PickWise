import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import useLocation from '../hooks/useLocation';

const STEPS = [
  {
    icon: '🔍',
    label: 'Ask',
    desc: 'Type any question in plain English. No special syntax, no categories to pick. Just ask like you would a knowledgeable friend.'
  },
  {
    icon: '⚡',
    label: 'Search',
    desc: 'Pickwise AI searches hundreds of live sources in seconds — reviews, directories, expert rankings, and real-time availability.'
  },
  {
    icon: '🏆',
    label: 'Rank',
    desc: 'We score the best 6 options: 3 near you and 3 best worldwide. Every ranking is based on reviews, reputation, availability, and value.'
  },
  {
    icon: '✓',
    label: 'Choose',
    desc: 'Click to buy, book, visit, or download. Direct links, affiliate-labelled where applicable, always ranked independently.'
  }
];

const WHY_ITEMS = [
  {
    title: 'Real-time search',
    desc: 'Not a static database — Pickwise searches live every time you ask. Results are always current, never stale.'
  },
  {
    title: 'Scored independently',
    desc: 'Every result is scored on reviews, reputation, availability, and value. We never accept payment to improve a ranking.'
  },
  {
    title: 'Affiliate links are labelled',
    desc: 'When a link is an affiliate link, we say so clearly. Our rankings are never for sale — our income depends on giving you good results.'
  },
  {
    title: 'Private by design',
    desc: 'No searches are stored on our servers. Your location stays on your device. We use the minimum data needed to help you.'
  }
];

export default function HowItWorks() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleSearch(q) {
    navigate(`/results?q=${encodeURIComponent(q)}`);
  }

  return (
    <div style={{ background: '#F5F5FA', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(10,10,18,0.08)', padding: '60px 24px 48px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 40, color: '#0A0A12', marginBottom: 16, lineHeight: 1.15 }}>
            How Pickwise works
          </h1>
          <p style={{ fontSize: 17, color: '#3D3D52', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
            Ask any question. Get the 6 best answers — 3 near you, 3 best in the world. In under 3 seconds.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
          position: 'relative'
        }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, padding: '28px 24px',
              border: '1px solid rgba(10,10,18,0.08)', textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{step.icon}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, color: '#0A0A12', marginBottom: 10 }}>
                {step.label}
              </h3>
              <p style={{ fontSize: 14, color: '#3D3D52', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                {step.desc}
              </p>
              {i < STEPS.length - 1 && (
                <div style={{
                  position: 'absolute', right: -13, top: '50%', transform: 'translateY(-50%)',
                  width: 24, height: 24, background: '#5254E8', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 13, zIndex: 1
                }}>→</div>
              )}
            </div>
          ))}
        </div>

        {/* Why trust section */}
        <div style={{ marginTop: 80 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 32, color: '#0A0A12', textAlign: 'center', marginBottom: 40 }}>
            Why trust Pickwise?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {WHY_ITEMS.map((item, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 14, padding: '24px',
                border: '1px solid rgba(10,10,18,0.08)'
              }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: '#0A0A12', marginBottom: 8 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: '#3D3D52', lineHeight: 1.6, fontFamily: 'Inter, sans-serif', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 64, textAlign: 'center' }}>
          <p style={{ fontSize: 15, color: '#3D3D52', marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
            Try a search right now →
          </p>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <SearchBar
              locationDisplay={location.city ? `${location.city}` : ''}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="repeat(4, 1fr)"] { grid-template-columns: 1fr 1fr !important; }
          div[style*="repeat(2, 1fr)"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          div[style*="repeat(4, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
