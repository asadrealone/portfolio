import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

export function useCounter(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;

    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, end, duration, start]);

  return [ref, count];
}

export function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'skills', 'projects', 'achievements', 'testimonials', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrolled, activeSection };
}

export function useTypingEffect(texts, speed = 80, pause = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout;

    if (!isDeleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex));
        setCharIndex(c => c + 1);
      }, speed);
    } else if (!isDeleting && charIndex > current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      }, speed / 2);
    } else {
      setIsDeleting(false);
      setTextIndex(i => (i + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, pause]);

  return displayText;
}
