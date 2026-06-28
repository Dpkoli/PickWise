import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ initialValue = '', locationDisplay = '', onSearch }) {
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const q = value.trim();
    if (!q) {
      inputRef.current?.classList.add('shake');
      setTimeout(() => inputRef.current?.classList.remove('shake'), 600);
      return;
    }
    if (onSearch) {
      onSearch(q);
    } else {
      navigate(`/results?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
      <div
        ref={inputRef}
        style={{
          flex: 1, display: 'flex', alignItems: 'center',
          border: `2px solid ${focused ? '#5254E8' : '#5254E8'}`,
          borderRadius: 12, background: '#fff', padding: '0 12px',
          boxShadow: focused ? '0 0 0 4px rgba(82,84,232,0.12)' : 'none',
          transition: 'box-shadow 150ms', gap: 10, minHeight: 52
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5254E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask anything — products, services, places, digital..."
          style={{
            flex: 1, border: 'none', outline: 'none', fontSize: 15,
            fontFamily: 'Inter, sans-serif', color: '#0A0A12', background: 'transparent'
          }}
        />
        {locationDisplay && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: '#E6FBF3', borderRadius: 20, padding: '4px 10px',
            fontSize: 12, fontWeight: 500, color: '#09865A', whiteSpace: 'nowrap', flexShrink: 0
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#09865A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {locationDisplay}
          </div>
        )}
      </div>
      <button
        type="submit"
        style={{
          background: '#5254E8', color: '#fff', border: 'none', borderRadius: 10,
          padding: '12px 22px', fontSize: 14, fontWeight: 600, fontFamily: 'Inter, sans-serif',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
          transition: 'background 150ms', flexShrink: 0
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#3A3CC9'}
        onMouseLeave={e => e.currentTarget.style.background = '#5254E8'}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 3h5v5" /><path d="M8 3H3v5" /><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" /><path d="m15 9 6-6" />
        </svg>
        Find best 6
      </button>
      <style>{`
        .shake { animation: shake 0.5s ease-in-out; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @media (max-width: 640px) {
          form { flex-direction: column !important; }
          form button { width: 100%; justify-content: center; }
        }
      `}</style>
    </form>
  );
}
