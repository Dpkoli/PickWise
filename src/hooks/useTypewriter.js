import { useState, useEffect, useRef } from 'react';

export default function useTypewriter(queries, options = {}) {
  const { typeSpeed = 48, deleteSpeed = 28, pauseDuration = 2000 } = options;
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const indexRef = useRef(0);
  const charIndexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplayText(queries[0]);
      return;
    }

    function tick() {
      const current = queries[indexRef.current];
      if (isTyping) {
        if (charIndexRef.current < current.length) {
          charIndexRef.current++;
          setDisplayText(current.slice(0, charIndexRef.current));
          timerRef.current = setTimeout(tick, typeSpeed);
        } else {
          timerRef.current = setTimeout(() => {
            setIsTyping(false);
            tick();
          }, pauseDuration);
        }
      } else {
        if (charIndexRef.current > 0) {
          charIndexRef.current--;
          setDisplayText(current.slice(0, charIndexRef.current));
          timerRef.current = setTimeout(tick, deleteSpeed);
        } else {
          indexRef.current = (indexRef.current + 1) % queries.length;
          setIsTyping(true);
          timerRef.current = setTimeout(tick, typeSpeed);
        }
      }
    }

    timerRef.current = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timerRef.current);
  }, [queries, typeSpeed, deleteSpeed, pauseDuration, isTyping]);

  return displayText;
}
