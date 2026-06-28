import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#FFFFFF', borderBottom: '1px solid rgba(10,10,18,0.10)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: '#5254E8' }}>Pick</span>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: '#0A0A12' }}>wise</span>
        </Link>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Link to="/how-it-works" style={{ fontSize: 14, fontWeight: 500, color: '#3D3D52', textDecoration: 'none' }}>How it works</Link>
          <Link to="/trending" style={{ fontSize: 14, fontWeight: 500, color: '#3D3D52', textDecoration: 'none' }}>Trending</Link>
          <a href="mailto:privacy@pickwise.com" style={{ fontSize: 14, fontWeight: 500, color: '#3D3D52', textDecoration: 'none' }}>About</a>
          <Link to="/results?q=best+running+shoes" style={{
            background: '#5254E8', color: '#fff', fontSize: 14, fontWeight: 600,
            padding: '8px 18px', borderRadius: 20, textDecoration: 'none', transition: 'background 150ms'
          }}
            onMouseEnter={e => e.target.style.background = '#3A3CC9'}
            onMouseLeave={e => e.target.style.background = '#5254E8'}
          >Try free →</Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger-btn"
          aria-label="Toggle menu"
          style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 8, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ display: 'block', width: 22, height: 2, background: '#0A0A12', borderRadius: 2, transition: '150ms' }} />
          <span style={{ display: 'block', width: 22, height: 2, background: '#0A0A12', borderRadius: 2, transition: '150ms' }} />
          <span style={{ display: 'block', width: 22, height: 2, background: '#0A0A12', borderRadius: 2, transition: '150ms' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: '#fff', borderTop: '1px solid rgba(10,10,18,0.10)',
          padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 16
        }}>
          <Link to="/how-it-works" onClick={() => setMenuOpen(false)} style={{ fontSize: 15, fontWeight: 500, color: '#3D3D52' }}>How it works</Link>
          <Link to="/trending" onClick={() => setMenuOpen(false)} style={{ fontSize: 15, fontWeight: 500, color: '#3D3D52' }}>Trending</Link>
          <a href="mailto:privacy@pickwise.com" style={{ fontSize: 15, fontWeight: 500, color: '#3D3D52' }}>About</a>
          <Link to="/results?q=best+running+shoes" onClick={() => setMenuOpen(false)} style={{
            background: '#5254E8', color: '#fff', fontSize: 14, fontWeight: 600,
            padding: '10px 18px', borderRadius: 20, textAlign: 'center', textDecoration: 'none', display: 'block'
          }}>Try free →</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
