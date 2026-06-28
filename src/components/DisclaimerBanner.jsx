import React from 'react';

const CATEGORY_MESSAGES = {
  health: {
    icon: '🏥',
    text: 'These results are for informational purposes only and are not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.',
  },
  legal: {
    icon: '⚖️',
    text: 'These results are for informational purposes only and do not constitute legal advice. Please consult a qualified solicitor or legal professional for advice specific to your situation.',
  },
  financial: {
    icon: '💰',
    text: 'These results are for informational purposes only and do not constitute financial advice. Please consult a qualified financial adviser before making any investment decisions.',
  },
};

const styles = {
  banner: {
    background: 'var(--red-soft)',
    border: '1px solid #FECACA',
    borderRadius: '12px',
    padding: '14px 18px',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    marginBottom: '24px',
    animation: 'fadeIn 0.3s ease',
  },
  icon: {
    fontSize: '18px',
    flexShrink: 0,
    lineHeight: 1.4,
  },
  text: {
    fontSize: '13px',
    color: '#7F1D1D',
    lineHeight: 1.6,
  },
};

export default function DisclaimerBanner({ category }) {
  const info = CATEGORY_MESSAGES[category];
  if (!info) return null;

  return (
    <div style={styles.banner} role="alert">
      <span style={styles.icon}>{info.icon}</span>
      <p style={styles.text}>{info.text}</p>
    </div>
  );
}
