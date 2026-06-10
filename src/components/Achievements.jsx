import { useRef, useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import { ACHIEVEMENTS } from '../data/portfolioData';

function AnimatedCounter({ end, suffix = '', isDecimal = false, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = end * eased;
      setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [triggered, end, duration, isDecimal]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Achievements() {
  const [headingRef, headingVisible] = useScrollReveal(0.1);
  const [gridRef, gridVisible] = useScrollReveal(0.1);

  return (
    <section id="achievements" style={{ padding: '6rem 1.5rem', position: 'relative' }}>
      {/* Gradient band */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(37,99,235,0.05), rgba(6,182,212,0.05))',
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div
          ref={headingRef}
          className={`reveal ${headingVisible ? 'visible' : ''}`}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Achievements
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: '1.1',
            marginTop: '0.75rem',
          }}>
            Numbers That{' '}
            <span className="gradient-text">Speak</span>
          </h2>
          <p style={{
            marginTop: '1rem',
            color: 'var(--text-secondary)',
            fontSize: '1rem',
          }}>
            Key milestones from my AI/ML journey so far.
          </p>
        </div>

        {/* Counter Cards */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem',
          }}
        >
          {ACHIEVEMENTS.map((item, i) => (
            <div
              key={item.label}
              className={`counter-card reveal-scale ${gridVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div style={{ fontSize: '2.75rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <div className="counter-number">
                <AnimatedCounter
                  end={item.value}
                  suffix={item.suffix}
                  isDecimal={item.isDecimal}
                />
              </div>
              <div style={{
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginTop: '0.5rem',
                lineHeight: '1.4',
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner */}
        <div
          className={`reveal ${headingVisible ? 'visible' : ''} delay-400`}
          style={{
            padding: '2rem 2.5rem',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(6,182,212,0.1))',
            border: '1px solid rgba(37, 99, 235, 0.2)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              🤖 AI/ML Focus
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              Specialized in building end-to-end machine learning pipelines —
              from data preprocessing to model evaluation and deployment preparation.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              📚 Academic Excellence
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              Maintaining a 3.75 CGPA while simultaneously completing
              real-world AI/ML projects and an internship at Built &amp; Soft.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
