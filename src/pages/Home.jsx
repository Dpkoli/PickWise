import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTypewriter from '../hooks/useTypewriter';
import useLocation from '../hooks/useLocation';
import SearchBar from '../components/SearchBar';
import TrustBar from '../components/TrustBar';
import AiInsightBar from '../components/AiInsightBar';
import { CYCLING_QUERIES, EXAMPLE_CHIPS } from '../utils/queries';

const STATIC_LOCAL = [
  {
    rank: 1, name: 'Mothercare Westfield', score: 9.4, type: 'local', isTop: true,
    description: 'Largest dedicated baby & toddler store in West London. Full training aisle, 40+ products, trained staff on hand.',
    tags: ['0.4 mi', 'In stock', 'Expert staff'],
    ctaText: 'Get directions + shop', affiliateHint: 'google_maps'
  },
  {
    rank: 2, name: 'John Lewis Oxford St', score: 9.1, type: 'local',
    description: 'Premium nursery section. Stocks ClevaMama & own-brand potty sets. Click & collect available today.',
    tags: ['0.9 mi', 'Price match'],
    ctaText: 'See stock → affiliate', affiliateHint: 'amazon_uk'
  },
  {
    rank: 3, name: 'Amazon UK Same Day', score: 8.8, type: 'local',
    description: 'BABYBJÖRN Potty Chair (4.7★, 12k reviews). £24.99. Delivered to your door by tonight.',
    tags: ['Same-day', 'Prime eligible'],
    ctaText: 'Buy on Amazon → affiliate', affiliateHint: 'amazon_uk'
  }
];

const STATIC_WORLD = [
  {
    rank: 1, name: 'BABYBJÖRN Potty Chair', score: 9.7, type: 'world', isTop: true,
    description: 'Rated #1 globally. Ergonomic splash guard, easy-clean. Recommended by paediatricians in 40+ countries.',
    tags: ['Sweden', 'Paed. approved', 'Ships to UK'],
    ctaText: 'Buy direct → affiliate', affiliateHint: 'amazon_uk'
  },
  {
    rank: 2, name: "Oh Crap! Potty Training", score: 9.5, type: 'world',
    description: "World's #1 potty training book. 800k+ copies sold. Step-by-step method for boys aged 20–30 months.",
    tags: ['Book + method', 'Instant download'],
    ctaText: 'Buy on Amazon → affiliate', affiliateHint: 'amazon_uk'
  },
  {
    rank: 3, name: 'Potty Training Consultant', score: 9.2, type: 'world',
    description: 'Certified toddler specialists via 1:1 video call. Used by 50k+ families worldwide. Any timezone.',
    tags: ['Service', 'Online', 'Certified'],
    ctaText: 'Book a session → affiliate', affiliateHint: 'default'
  }
];

function StaticResultCard({ rank, name, score, description, tags, ctaText, type, isTop }) {
  const accentColor = type === 'local' ? '#0EB87B' : '#5254E8';
  return (
    <div style={{
      position: 'relative', background: '#fff',
      border: `${isTop ? '1.5px' : '1px'} solid ${isTop ? accentColor : 'rgba(10,10,18,0.10)'}`,
      borderRadius: 10, overflow: 'hidden', marginBottom: 8,
      transition: 'transform 150ms',
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: accentColor }} />
      <div style={{ padding: '12px 12px 12px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: '#8888A0', minWidth: 22 }}>{rank}</span>
            <span style={{ fontWeight: 600, fontSize: 13, color: '#0A0A12', fontFamily: 'Inter, sans-serif' }}>{name}</span>
          </div>
          <div style={{ background: '#E6FBF3', color: '#09865A', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 10, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {score}/10
          </div>
        </div>
        <p style={{ fontSize: 12, color: '#3D3D52', lineHeight: 1.45, marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>{description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
          {tags.map((tag, i) => (
            <span key={i} style={{ fontSize: 11, color: '#8888A0', background: '#F5F5FA', border: '0.5px solid rgba(10,10,18,0.10)', borderRadius: 6, padding: '2px 7px', fontFamily: 'Inter, sans-serif' }}>{tag}</span>
          ))}
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: accentColor, fontFamily: 'Inter, sans-serif' }}>{ctaText} ↗</span>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const typewriterText = useTypewriter(CYCLING_QUERIES);

  function handleChip(query) {
    navigate(`/results?q=${encodeURIComponent(query)}`);
  }

  const locationDisplay = location.loading
    ? 'Detecting...'
    : location.city
      ? `${location.city}`
      : 'Set location';

  return (
    <main style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── Split Hero ── */}
      <div style={{ position: 'relative', display: 'flex', minHeight: 220 }}>
        {/* Left - green */}
        <div style={{ flex: 1, background: '#0EB87B', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 32px 40px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>NEAR YOU</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 28, color: '#fff', lineHeight: 1.2, marginBottom: 10 }}>3 best options<br />in your city</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>Real places, stores & services near you. Directions, stock levels & local pricing.</p>
        </div>

        {/* Divider + Lightning bolt */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'rgba(255,255,255,0.25)', transform: 'translateX(-50%)' }} />
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 44, height: 44, borderRadius: '50%',
          background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 16px rgba(0,0,0,0.18)', zIndex: 2
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#5254E8" stroke="none">
            <path d="M13 2L4.09 12.96A1 1 0 0 0 5 14.5h6.5l-1 7.5 9.36-11.46A1 1 0 0 0 19 9h-6l1-7z" />
          </svg>
        </div>

        {/* Right - blue */}
        <div style={{ flex: 1, background: '#5254E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 40px 40px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>IN THE WORLD</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 28, color: '#fff', lineHeight: 1.2, marginBottom: 10 }}>3 best options<br />on the planet</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>Globally acclaimed products, services & providers. Ranked by reviews, experts & reputation.</p>
        </div>
      </div>

      {/* ── Search Section ── */}
      <div style={{ background: '#fff', padding: '40px 24px 32px', borderBottom: '1px solid rgba(10,10,18,0.08)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {/* Animated heading */}
          <div style={{ marginBottom: 20, minHeight: 36, display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: '#0A0A12' }}>Find the best </span>
            <span style={{ fontSize: 15, color: '#5254E8', borderBottom: '2px solid #5254E8', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{typewriterText}</span>
            <span style={{ display: 'inline-block', width: 2, height: 16, background: '#5254E8', animation: 'blink 0.8s step-end infinite', verticalAlign: 'middle' }} />
          </div>

          <SearchBar
            locationDisplay={locationDisplay}
            onSearch={q => navigate(`/results?q=${encodeURIComponent(q)}`)}
          />

          {/* Example chips */}
          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#8888A0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>TRY AN EXAMPLE</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {EXAMPLE_CHIPS.map(chip => (
                <button
                  key={chip}
                  onClick={() => handleChip(chip)}
                  style={{
                    fontSize: 12, fontWeight: 500, color: '#3D3D52', background: '#F0F0F8',
                    border: '1px solid rgba(10,10,18,0.10)', borderRadius: 20,
                    padding: '6px 13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                    transition: 'background 150ms, color 150ms, border-color 150ms'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#5254E8';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = '#5254E8';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#F0F0F8';
                    e.currentTarget.style.color = '#3D3D52';
                    e.currentTarget.style.borderColor = 'rgba(10,10,18,0.10)';
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Static Results Preview ── */}
      <div style={{ background: '#F5F5FA', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
            <p style={{ fontSize: 13, color: '#8888A0', fontFamily: 'Inter, sans-serif' }}>
              Showing results for <strong style={{ color: '#0A0A12' }}>"toilet training material for my 2 year old boy"</strong>
            </p>
            <span style={{ fontSize: 11, background: '#F0F0F8', borderRadius: 20, padding: '4px 12px', color: '#8888A0', fontFamily: 'Inter, sans-serif' }}>⚡ 2.4 sec</span>
          </div>

          {/* Affiliate disclosure */}
          <div style={{ borderLeft: '3px solid #F59E0B', background: '#FFFBEB', borderRadius: '0 8px 8px 0', padding: '10px 14px', marginBottom: 16 }}>
            <p style={{ fontSize: 12, color: '#3D3D52', fontFamily: 'Inter, sans-serif', margin: 0 }}>
              ℹ️ Some links below are affiliate links. If you click and buy, we may earn a small commission — at no cost to you. This never affects our rankings.
            </p>
          </div>

          {/* Two-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Local */}
            <div>
              <div style={{ background: '#E6FBF3', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EB87B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#0A0A12' }}>Near you — London</span>
                </div>
                <span style={{ fontSize: 12, color: '#8888A0', fontFamily: 'Inter, sans-serif' }}>3 picks</span>
              </div>
              {STATIC_LOCAL.map(card => <StaticResultCard key={card.rank} {...card} />)}
            </div>

            {/* World */}
            <div>
              <div style={{ background: '#EEEEFF', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5254E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#0A0A12' }}>Best in the world</span>
                </div>
                <span style={{ fontSize: 12, color: '#8888A0', fontFamily: 'Inter, sans-serif' }}>3 picks</span>
              </div>
              {STATIC_WORLD.map(card => <StaticResultCard key={card.rank} {...card} />)}
            </div>
          </div>

          {/* AI Insight Bar */}
          <AiInsightBar insight="For boys, the BABYBJÖRN with a built-in splash guard is most recommended by UK health visitors. Avoid padded seat inserts at this age — they can delay independence." />
        </div>
      </div>

      {/* ── Trust Bar ── */}
      <TrustBar />

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @media (max-width: 640px) {
          div[style*="minHeight: 220"] { flex-direction: column !important; min-height: auto !important; }
          div[style*="minHeight: 220"] > div:first-child,
          div[style*="minHeight: 220"] > div:last-child { padding: 28px 24px !important; }
          div[style*="gridTemplateColumns: '1fr 1fr'"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
