import React from 'react';

export default function AiInsightBar({ insight, onAskMore }) {
  if (!insight) return null;

  return (
    <div style={{
      background: '#0A0A12', borderRadius: 10, padding: '16px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, marginTop: 16
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>✨</span>
        <p style={{ fontSize: 13, color: '#fff', lineHeight: 1.6, fontFamily: 'Inter, sans-serif', margin: 0 }}>
          {insight}
        </p>
      </div>
      {onAskMore && (
        <button
          onClick={onAskMore}
          style={{
            background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600,
            fontFamily: 'Inter, sans-serif', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
            transition: 'background 150ms'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.10)'}
        >
          Ask more ↗
        </button>
      )}
    </div>
  );
}
