import React, { useState } from 'react';

export default function ReportResultModal({ name, rank, query, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [issue, setIssue] = useState('');
  const [reporter, setReporter] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    try {
      const reports = JSON.parse(localStorage.getItem('pickwise_reports') || '[]');
      reports.push({ name, rank, query, issue, reporter, ts: Date.now() });
      localStorage.setItem('pickwise_reports', JSON.stringify(reports.slice(-50)));
    } catch (err) {}
    setSubmitted(true);
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(10,10,18,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 500, padding: 24
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: '#fff', borderRadius: 16, padding: 28, maxWidth: 440, width: '100%',
        fontFamily: 'Inter, sans-serif', boxShadow: '0 20px 60px rgba(10,10,18,0.2)'
      }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#0A0A12', marginBottom: 8 }}>
              Thank you!
            </h3>
            <p style={{ fontSize: 14, color: '#3D3D52', lineHeight: 1.6 }}>
              Your report helps us improve AI accuracy.
            </p>
            <button onClick={onClose} style={{
              marginTop: 20, background: '#5254E8', color: '#fff', border: 'none',
              borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer'
            }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#0A0A12', marginBottom: 4 }}>
                  Report inaccurate result
                </h3>
                <p style={{ fontSize: 12, color: '#8888A0' }}>Result #{rank}: {name}</p>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#8888A0' }}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#3D3D52', marginBottom: 5 }}>
                  Your name (optional)
                </label>
                <input
                  type="text"
                  value={reporter}
                  onChange={e => setReporter(e.target.value)}
                  placeholder="Anonymous"
                  style={{
                    width: '100%', padding: '9px 12px', border: '1px solid rgba(10,10,18,0.15)',
                    borderRadius: 8, fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#3D3D52', marginBottom: 5 }}>
                  What's the issue? *
                </label>
                <textarea
                  value={issue}
                  onChange={e => setIssue(e.target.value)}
                  required
                  rows={4}
                  placeholder="e.g. This business is closed, the information is outdated, the ranking seems wrong..."
                  style={{
                    width: '100%', padding: '9px 12px', border: '1px solid rgba(10,10,18,0.15)',
                    borderRadius: 8, fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none',
                    resize: 'vertical', boxSizing: 'border-box'
                  }}
                />
              </div>
              <button type="submit" style={{
                width: '100%', background: '#5254E8', color: '#fff', border: 'none',
                borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'Inter, sans-serif'
              }}>
                Submit report
              </button>
            </form>
            <p style={{ fontSize: 11, color: '#8888A0', marginTop: 14, textAlign: 'center', lineHeight: 1.5 }}>
              Reports help us improve AI accuracy. Thank you for helping.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
