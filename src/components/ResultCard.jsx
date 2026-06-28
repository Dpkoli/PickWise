import React, { useState } from 'react';
import { buildAffiliateUrl, logClick } from '../utils/affiliates';
import ReportResultModal from './ReportResultModal';

export default function ResultCard({ rank, name, score, description, tags, ctaText, affiliateHint, type, isTop, query, category, animationDelay = 0 }) {
  const [showReport, setShowReport] = useState(false);
  const accentColor = type === 'local' ? '#0EB87B' : '#5254E8';
  const affiliateUrl = buildAffiliateUrl(affiliateHint, name, query);

  function handleCtaClick() {
    logClick({ rank, type, name, category, query });
  }

  return (
    <>
      <div
        data-rank={rank}
        data-category={category}
        data-query={query}
        style={{
          position: 'relative',
          background: '#fff',
          border: `${isTop ? '1.5px' : '1px'} solid ${isTop ? accentColor : 'rgba(10,10,18,0.10)'}`,
          borderRadius: 10,
          overflow: 'hidden',
          animation: `cardIn 400ms ease both`,
          animationDelay: `${animationDelay}ms`,
          transition: 'transform 150ms, border-color 150ms',
          cursor: 'default'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
      >
        {/* Accent bar */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
          background: accentColor, borderRadius: '3px 0 0 3px'
        }} />

        <div style={{ paddingLeft: 14, paddingRight: 12, paddingTop: 12, paddingBottom: 12 }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: '#8888A0', minWidth: 22 }}>{rank}</span>
              <span style={{ fontWeight: 600, fontSize: 13, color: '#0A0A12', fontFamily: 'Inter, sans-serif' }}>{name}</span>
            </div>
            <div style={{
              background: '#E6FBF3', color: '#09865A', fontSize: 11, fontWeight: 700,
              padding: '3px 8px', borderRadius: 10, whiteSpace: 'nowrap', flexShrink: 0,
              fontFamily: 'Inter, sans-serif'
            }}>
              {score}/10
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontSize: 12, color: '#3D3D52', lineHeight: 1.45, marginBottom: 8,
            fontFamily: 'Inter, sans-serif',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
          }}>
            {description}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
              {tags.map((tag, i) => (
                <span key={i} style={{
                  fontSize: 11, color: '#8888A0', background: '#F5F5FA',
                  border: '0.5px solid rgba(10,10,18,0.10)', borderRadius: 6,
                  padding: '2px 7px', fontFamily: 'Inter, sans-serif'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* AFFILIATE: Replace href with tracked URL */}
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              onClick={handleCtaClick}
              style={{
                fontSize: 12, fontWeight: 600, color: '#5254E8',
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
                fontFamily: 'Inter, sans-serif'
              }}
            >
              {ctaText || 'View →'}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <button
              onClick={() => setShowReport(true)}
              style={{
                fontSize: 11, color: '#8888A0', background: 'none', border: 'none',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: '2px 4px'
              }}
              title="Report inaccurate result"
            >
              ⚑ Report
            </button>
          </div>
        </div>
      </div>

      {showReport && (
        <ReportResultModal
          name={name}
          rank={rank}
          query={query}
          onClose={() => setShowReport(false)}
        />
      )}
    </>
  );
}
