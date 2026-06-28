import React, { useState, useRef, useEffect } from 'react';
import { askFollowUp } from '../utils/api';

const styles = {
  container: {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    padding: '20px',
    marginTop: '32px',
    animation: 'cardIn 0.3s ease',
  },
  title: {
    fontFamily: 'Syne, sans-serif',
    fontWeight: 700,
    fontSize: '16px',
    color: 'var(--ink)',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  messages: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '16px',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  userMsg: {
    alignSelf: 'flex-end',
    background: 'var(--blue)',
    color: '#fff',
    borderRadius: '12px 12px 4px 12px',
    padding: '10px 14px',
    fontSize: '14px',
    maxWidth: '75%',
    lineHeight: 1.5,
  },
  aiMsg: {
    alignSelf: 'flex-start',
    background: 'var(--bg)',
    color: 'var(--ink2)',
    borderRadius: '12px 12px 12px 4px',
    padding: '10px 14px',
    fontSize: '14px',
    maxWidth: '85%',
    lineHeight: 1.65,
    border: '1px solid var(--border)',
  },
  form: {
    display: 'flex',
    gap: '8px',
  },
  input: {
    flex: 1,
    border: '1.5px solid var(--border)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '14px',
    color: 'var(--ink)',
    outline: 'none',
    background: 'var(--bg)',
    transition: 'border-color 0.15s',
  },
  sendBtn: {
    background: 'var(--blue)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 18px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'background 0.15s',
    fontFamily: 'inherit',
  },
  thinking: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    padding: '10px 14px',
    background: 'var(--bg)',
    borderRadius: '12px',
    border: '1px solid var(--border)',
    width: 'fit-content',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--ink3)',
    animation: 'pulse 1.2s ease-in-out infinite',
  },
};

const SUGGESTED = [
  'Which one has the best reviews?',
  'What\'s the price range?',
  'Which is best for beginners?',
];

export default function FollowUpChat({ originalQuery, results }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function handleSend(text) {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text: q }]);
    setLoading(true);
    try {
      const answer = await askFollowUp(q, originalQuery, results);
      setMessages(m => [...m, { role: 'ai', text: answer }]);
    } catch (err) {
      setMessages(m => [...m, { role: 'ai', text: 'Sorry, I couldn\'t answer that right now. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        <span>&#128172;</span> Ask a follow-up question
      </div>

      {messages.length === 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {SUGGESTED.map(s => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                borderRadius: '20px',
                background: 'var(--blue-tint)',
                color: 'var(--blue)',
                border: '1px solid rgba(82,84,232,0.15)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'background 0.15s',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {messages.length > 0 && (
        <div style={styles.messages}>
          {messages.map((m, i) => (
            <div key={i} style={m.role === 'user' ? styles.userMsg : styles.aiMsg}>
              {m.text}
            </div>
          ))}
          {loading && (
            <div style={styles.thinking}>
              <div style={{ ...styles.dot, animationDelay: '0ms' }} />
              <div style={{ ...styles.dot, animationDelay: '200ms' }} />
              <div style={{ ...styles.dot, animationDelay: '400ms' }} />
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      <form
        onSubmit={e => { e.preventDefault(); handleSend(); }}
        style={styles.form}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask anything about these results…"
          style={styles.input}
          onFocus={e => e.target.style.borderColor = 'var(--blue)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
          disabled={loading}
          aria-label="Follow-up question"
        />
        <button
          type="submit"
          style={{ ...styles.sendBtn, opacity: loading ? 0.6 : 1 }}
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
