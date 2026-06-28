import React from 'react';
import { Link } from 'react-router-dom';

export default function AffiliateDisclosureBanner() {
  return (
    <div style={{
      borderLeft: '3px solid #F59E0B', background: '#FFFBEB',
      borderRadius: '0 8px 8px 0', padding: '12px 16px', marginBottom: 16,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12
    }}>
      <p style={{ fontSize: 12, color: '#3D3D52', lineHeight: 1.55, fontFamily: 'Inter, sans-serif', margin: 0 }}>
        ℹ️ <strong>Affiliate links:</strong> Some results link to products or services we may earn a commission from if you click and buy. This never influences our AI rankings.
      </p>
      <Link to="/affiliate-disclosure" style={{
        fontSize: 12, fontWeight: 600, color: '#5254E8', whiteSpace: 'nowrap', flexShrink: 0,
        textDecoration: 'none', fontFamily: 'Inter, sans-serif'
      }}>
        Learn more →
      </Link>
    </div>
  );
}
