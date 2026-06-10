import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useAnimations';
import { TESTIMONIALS } from '../data/portfolioData';

const StarIcon = () => (
  <svg width="14" height="14" fill="#fbbf24" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const QuoteIcon = () => (
  <svg width="32" height="32" fill="rgba(96, 165, 250, 0.3)" viewBox="0 0 24 24">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
  </svg>
);

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [headingRef, headingVisible] = useScrollReveal(0.1);

  const navigate = useCallback((dir) => {
    setDirection(dir);
    setCurrent(c => (c + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => navigate(1), 5000);
    return () => clearInterval(id);
  }, [navigate]);

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.3 } }),
  };

  const t = TESTIMONIALS[current];

  return (
    <section id="testimonials" style={{
      padding: '6rem 1.5rem',
      position: 'relative',
      background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.04), transparent)',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={headingRef}
          className={`reveal ${headingVisible ? 'visible' : ''}`}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span className="section-badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Testimonials
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: '1.1',
            marginTop: '0.75rem',
          }}>
            What Clients{' '}
            <span className="gradient-text">Say</span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div style={{
          position: 'relative',
          padding: '2.5rem',
          borderRadius: '24px',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--glass-border)',
          minHeight: '280px',
          overflow: 'hidden',
        }}>
          {/* Quote icon */}
          <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
            <QuoteIcon />
          </div>

          {/* Animated testimonial */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Quote text */}
              <blockquote style={{
                fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                color: 'var(--text-primary)',
                lineHeight: '1.8',
                fontStyle: 'italic',
                marginBottom: '2rem',
                fontWeight: '400',
              }}>
                "{t.text}"
              </blockquote>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '1rem',
                  color: 'white',
                  flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '2rem',
        }}>
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid var(--glass-border)',
              background: 'var(--bg-card)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
            }}
            aria-label="Previous testimonial"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </motion.button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  background: i === current
                    ? 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
                    : 'var(--border-subtle)',
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={() => navigate(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid var(--glass-border)',
              background: 'var(--bg-card)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
            }}
            aria-label="Next testimonial"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
