import React, { useState } from 'react';

const CONTENT = {
  health: {
    icon: '⚕️',
    title: 'Health notice',
    text: 'These results are for information only. Always consult a qualified healthcare professional before making any health or medical decision.',
    bg: '#EFF6FF', border: '#3B82F6'
  },
  legal: {
    icon: '⚖️',
    title: 'Legal notice',
    text: 'These are not legal recommendations. Always consult a qualified, regulated solicitor or legal professional for your specific situation.',
    bg: '#F5F3FF', border: '#7C3AED'
  },
  financial: {
    icon: '💷',
    title: 'Financial notice',
    text: 'This is not financial advice. Always consult a regulated financial adviser (FCA authorised in the UK) before making financial decisions.',
    bg: '#FFFBEB', border: '#F59E0B'
  }
};

export default function CategoryDisclaimer({ category }) {
  const [dismissed, setDismissed] = useState(false);
  if (!category || !CONTENT[category] || dismissed) return null;

  const { icon, title, text, bg, border } = CONTENT[category];

  return (
    <div style={{
      background: bg, borderLeft: `3px solid ${border}`,
      borderRadius: '0 8px 8px 0', padding: '12px 16px', marginBottom: 16,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12
    }}>
      <p style={{ fontSize: 13, color: '#3D3D52', lineHeight: 1.55, fontFamily: 'Inter, sans-serif', margin: 0 }}>
        <strong>{icon} {title}:</strong> {text}
      </p>
      <button
        onClick={() => setDismissed(true)}
        style={{
          background: 'none', border: 'none', fontSize: 16, cursor: 'pointer',
          color: '#8888A0', flexShrink: 0, padding: '0 4px'
        }}
        aria-label="Dismiss"
      >×</button>
    </div>
  );
}
