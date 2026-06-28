import React from 'react';

const TRUST_ITEMS = [
  { icon: '🛡️', text: 'Unbiased AI ranking' },
  { icon: '🌍', text: 'Works in 40+ countries' },
  { icon: '🔒', text: 'No searches stored' },
  { icon: '⚡', text: 'Results in under 3 sec' },
];

export default function TrustBar() {
  return (
    <div style={{
      background: '#F5F5FA', padding: '16px 24px',
      borderTop: '1px solid rgba(10,10,18,0.08)'
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: 32, flexWrap: 'wrap'
      }}>
        {TRUST_ITEMS.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#3D3D52', fontFamily: 'Inter, sans-serif' }}>{item.text}</span>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 640px) {
          div[style*="justify-content: center"] { display: grid !important; grid-template-columns: 1fr 1fr; gap: 14px !important; justify-items: start; }
        }
      `}</style>
    </div>
  );
}
