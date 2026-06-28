import React, { useState, useEffect } from 'react';

const MESSAGES = [
  'Searching near you…',
  'Scanning global sources…',
  'Ranking the best options…',
  'Almost ready…'
];

export default function LoadingState({ city }) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  const messages = city
    ? [`Searching near ${city}…`, 'Scanning global sources…', 'Ranking the best options…', 'Almost ready…']
    : MESSAGES;

  useEffect(() => {
    const msgTimer = setInterval(() => setMsgIdx(i => (i + 1) % messages.length), 600);
    return () => clearInterval(msgTimer);
  }, [messages.length]);

  useEffect(() => {
    const start = Date.now();
    const frame = requestAnimationFrame(function tick() {
      const p = Math.min(90, ((Date.now() - start) / 3000) * 90);
      setProgress(p);
      if (p < 90) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(245,245,250,0.96)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      zIndex: 200, fontFamily: 'Inter, sans-serif'
    }}>
      {/* Logo mark */}
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 32, color: '#5254E8', animation: 'pulse 1.5s ease-in-out infinite' }}>Pick</span>
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 32, color: '#0A0A12' }}>wise</span>
      </div>

      {/* Spinner */}
      <div style={{
        width: 40, height: 40, border: '3px solid rgba(82,84,232,0.15)',
        borderTopColor: '#5254E8', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite', marginBottom: 24
      }} />

      {/* Message */}
      <p style={{ fontSize: 14, color: '#3D3D52', minHeight: 22, animation: 'fadeIn 200ms ease', marginBottom: 24 }}>
        {messages[msgIdx]}
      </p>

      {/* Progress bar */}
      <div style={{ width: 240, height: 2, background: 'rgba(82,84,232,0.15)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', background: '#5254E8', borderRadius: 2,
          width: `${progress}%`, transition: 'width 100ms linear'
        }} />
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
