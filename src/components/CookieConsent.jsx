import React, { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('pickwise_cookie_consent');
      if (!consent) setVisible(true);
    } catch (e) {
      setVisible(true);
    }
  }, []);

  function accept() {
    try { localStorage.setItem('pickwise_cookie_consent', 'all'); } catch (e) {}
    setVisible(false);
  }

  function essential() {
    try { localStorage.setItem('pickwise_cookie_consent', 'essential'); } catch (e) {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
      background: '#fff', borderTop: '1px solid rgba(10,10,18,0.10)',
      boxShadow: '0 -4px 24px rgba(10,10,18,0.08)',
      padding: '16px 24px', fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <p style={{ fontSize: 13, color: '#3D3D52', lineHeight: 1.5, margin: 0, flex: 1 }}>
          🍪 We use cookies for advertising (AdSense) and anonymous analytics (Google Analytics). We never sell your data.
        </p>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
          <button onClick={essential} style={{
            fontSize: 13, fontWeight: 500, color: '#3D3D52', background: '#F5F5FA',
            border: '1px solid rgba(10,10,18,0.12)', borderRadius: 8, padding: '8px 16px', cursor: 'pointer'
          }}>
            Essential only
          </button>
          <button onClick={accept} style={{
            fontSize: 13, fontWeight: 600, color: '#fff', background: '#5254E8',
            border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer'
          }}>
            Accept all
          </button>
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{
            fontSize: 13, color: '#5254E8', textDecoration: 'none', padding: '8px 4px', display: 'flex', alignItems: 'center'
          }}>
            Learn more →
          </a>
        </div>
      </div>
    </div>
  );
}
