import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useAnimations';
import { CERTIFICATIONS } from '../data/portfolioData';

const CertIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const BadgeCheckIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
  </svg>
);

export default function Certifications() {
  const [headingRef, headingVisible] = useScrollReveal(0.1);
  const [gridRef, gridVisible] = useScrollReveal(0.1);

  return (
    <section id="certifications" style={{
      padding: '6rem 1.5rem',
      position: 'relative',
      background: 'linear-gradient(180deg, transparent, rgba(37, 99, 235, 0.04), transparent)',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={headingRef}
          className={`reveal ${headingVisible ? 'visible' : ''}`}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <CertIcon />
            Certifications
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: '1.1',
            marginTop: '0.75rem',
          }}>
            My{' '}
            <span className="gradient-text">Certifications</span>
          </h2>
          <p style={{
            marginTop: '1rem',
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            maxWidth: '480px',
            margin: '1rem auto 0',
          }}>
            Recognized credentials validating my expertise in data science and AI/ML.
          </p>
        </div>

        {/* Cert Cards */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.id}
              className={`glass-card reveal-scale ${gridVisible ? 'visible' : ''}`}
              style={{
                borderRadius: '20px',
                padding: '2rem',
                transitionDelay: `${i * 100}ms`,
                position: 'relative',
                overflow: 'hidden',
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Gradient top bar */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #2563eb, #06b6d4)',
              }} />

              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37,99,235,0.08), transparent)',
                pointerEvents: 'none',
              }} />

              {/* Icon + Title row */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(6,182,212,0.2))',
                  border: '1px solid rgba(37,99,235,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  flexShrink: 0,
                }}>
                  {cert.icon}
                </div>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.35rem',
                    flexWrap: 'wrap',
                  }}>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: '800',
                      color: 'var(--text-primary)',
                      lineHeight: '1.3',
                    }}>
                      {cert.title}
                    </h3>
                  </div>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--accent-cyan)',
                    fontWeight: '600',
                  }}>
                    {cert.issuer}
                  </p>
                </div>
              </div>

              {/* Verified badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.85rem',
                background: 'rgba(37, 99, 235, 0.1)',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: 'var(--neon-blue)',
              }}>
                <BadgeCheckIcon />
                {cert.badge}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative commitment card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop: '2.5rem',
            padding: '2rem 2.5rem',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(6,182,212,0.1))',
            border: '1px solid rgba(37,99,235,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>🎓</span>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              Continuously Learning
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              I am actively pursuing additional certifications in Deep Learning, NLP, and MLOps
              to stay at the forefront of the AI/ML field.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
