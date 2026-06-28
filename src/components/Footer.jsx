import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A12', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 0' }}>
        {/* Top section */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 24, color: '#5254E8' }}>Pick</span>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 24, color: '#fff' }}>wise</span>
          </div>
          <p style={{ fontSize: 14, color: '#8888A0', marginTop: 4 }}>Smarter picks. Every time.</p>
        </div>

        {/* Link Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginBottom: 48 }}>
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link to="/how-it-works" style={{ fontSize: 14, color: '#8888A0', textDecoration: 'none' }}>How it works</Link>
              <Link to="/trending" style={{ fontSize: 14, color: '#8888A0', textDecoration: 'none' }}>Trending</Link>
              <a href="mailto:privacy@pickwise.com" style={{ fontSize: 14, color: '#8888A0', textDecoration: 'none' }}>About</a>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link to="/privacy-policy" style={{ fontSize: 14, color: '#8888A0', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link to="/terms-of-service" style={{ fontSize: 14, color: '#8888A0', textDecoration: 'none' }}>Terms of Service</Link>
              <Link to="/affiliate-disclosure" style={{ fontSize: 14, color: '#8888A0', textDecoration: 'none' }}>Affiliate Disclosure</Link>
              <Link to="/disclaimer" style={{ fontSize: 14, color: '#8888A0', textDecoration: 'none' }}>Disclaimer</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="mailto:privacy@pickwise.com" style={{ fontSize: 14, color: '#8888A0', textDecoration: 'none' }}>Contact</a>
              <a href="mailto:accuracy@pickwise.com" style={{ fontSize: 14, color: '#8888A0', textDecoration: 'none' }}>Report an issue</a>
              <a href="mailto:affiliates@pickwise.com" style={{ fontSize: 14, color: '#8888A0', textDecoration: 'none' }}>Advertise</a>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Connect</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#8888A0', textDecoration: 'none' }}>Twitter / X</a>
              <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#8888A0', textDecoration: 'none' }}>Reddit</a>
              <a href="https://producthunt.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#8888A0', textDecoration: 'none' }}>ProductHunt</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(136,136,160,0.2)', padding: '20px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12
        }}>
          <p style={{ fontSize: 12, color: '#8888A0' }}>© 2026 Pickwise. All rights reserved.</p>
          <p style={{ fontSize: 12, color: '#8888A0' }}>Some links earn us a small commission. Rankings are always independent.</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer > div > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          footer > div > div:last-child {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
