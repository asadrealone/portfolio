import { useScrollReveal } from '../hooks/useAnimations';
import { ABOUT_BIO_PARAGRAPHS, ABOUT_INTERESTS, EDUCATION } from '../data/portfolioData';
import { motion } from 'framer-motion';

const UserIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const AcademicIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export default function About() {
  const [headingRef, headingVisible] = useScrollReveal(0.2);
  const [bioRef, bioVisible] = useScrollReveal(0.2);
  const [eduRef, eduVisible] = useScrollReveal(0.2);

  return (
    <section id="about" style={{ padding: '6rem 1.5rem', position: 'relative' }}>
      <div className="grid-bg" style={{ opacity: 0.5 }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Section Header */}
        <div
          ref={headingRef}
          className={`reveal ${headingVisible ? 'visible' : ''}`}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <UserIcon />
            About Me
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: '1.1',
            marginTop: '0.75rem',
          }}>
            Passionate About{' '}
            <span className="gradient-text">Artificial Intelligence</span>
          </h2>
        </div>

        {/* Two-column: Bio + Education */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>

          {/* Bio Column */}
          <div ref={bioRef} className={`reveal-left ${bioVisible ? 'visible' : ''}`}>

            {/* Avatar */}
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              fontSize: '2.5rem',
              boxShadow: '0 8px 32px rgba(37, 99, 235, 0.35)',
              animation: 'float 4s ease-in-out infinite',
            }}>
              🤖
            </div>

            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1.25rem',
              color: 'var(--text-primary)',
            }}>
              Asad Ali
            </h3>

            {ABOUT_BIO_PARAGRAPHS.map((para, i) => (
              <p key={i} style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.95rem',
                marginBottom: '1rem',
              }}>
                {para}
              </p>
            ))}

            {/* Interests */}
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{
                fontSize: '0.8rem',
                fontWeight: '700',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.75rem',
              }}>
                My Interests
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {ABOUT_INTERESTS.map((interest) => (
                  <span key={interest} className="tech-badge" style={{ fontSize: '0.82rem' }}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Status indicator */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              background: 'rgba(34, 197, 94, 0.08)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '12px',
              fontSize: '0.875rem',
              color: '#4ade80',
              marginTop: '1.5rem',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }} />
              Open to AI/ML internships & opportunities
            </div>
          </div>

          {/* Education Column */}
          <div ref={eduRef} className={`reveal-right ${eduVisible ? 'visible' : ''}`}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <AcademicIcon />
              Education
            </h3>

            {EDUCATION.map((edu, i) => (
              <motion.div
                key={i}
                className="glass-card"
                style={{
                  borderRadius: '16px',
                  padding: '2rem',
                  marginBottom: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Top accent bar */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #2563eb, #06b6d4)',
                }} />

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(6,182,212,0.2))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}>
                    {edu.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      marginBottom: '0.25rem',
                    }}>
                      {edu.degree}
                    </h4>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--accent-cyan)',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                    }}>
                      {edu.institution}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.2rem 0.65rem',
                        background: 'rgba(37, 99, 235, 0.1)',
                        border: '1px solid rgba(37, 99, 235, 0.2)',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: 'var(--neon-blue)',
                      }}>
                        📅 {edu.duration}
                      </span>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.2rem 0.65rem',
                        background: 'rgba(234, 179, 8, 0.1)',
                        border: '1px solid rgba(234, 179, 8, 0.2)',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#facc15',
                      }}>
                        ⭐ CGPA: {edu.cgpa}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Fun facts / highlights */}
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{
                fontSize: '0.8rem',
                fontWeight: '700',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1rem',
              }}>
                Quick Highlights
              </p>
              {[
                { icon: '📍', text: 'Based in Bahawalpur, Pakistan' },
                { icon: '🎯', text: 'Focused on AI/ML Engineering' },
                { icon: '📚', text: 'Currently a CS undergraduate (2024–2028)' },
                { icon: '💡', text: 'Hands-on project experience in ML pipelines' },
              ].map((fact, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 0',
                  borderBottom: i < 3 ? '1px solid var(--glass-border)' : 'none',
                }}>
                  <span style={{ fontSize: '1rem' }}>{fact.icon}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{fact.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
