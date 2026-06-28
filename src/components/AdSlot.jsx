import React from 'react';

const SIZES = {
  leaderboard: { width: '728px', minHeight: '90px' },
  rectangle:   { width: '300px', minHeight: '250px' },
  sidebar:     { width: '300px', minHeight: '600px' },
  responsive:  { width: '100%',  minHeight: '90px' }
};

export default function AdSlot({ size = 'responsive', slot }) {
  const consent = (() => {
    try { return localStorage.getItem('pickwise_cookie_consent'); } catch { return null; }
  })();

  if (consent === 'essential') return null;

  const dims = SIZES[size] || SIZES.responsive;

  return (
    <div
      className={`adsense-slot adsense-${size}`}
      data-ad-slot={slot || 'XXXXXXXXXX'}
      style={{
        ...dims,
        maxWidth: '100%',
        background: '#F0F0F8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        margin: '0 auto'
      }}
    >
      {/* ADSENSE: Replace this div with <ins class="adsbygoogle" ...> when approved */}
      <span style={{ fontSize: 12, color: '#8888A0', fontFamily: 'Inter, sans-serif' }}>Advertisement</span>
    </div>
  );
}
