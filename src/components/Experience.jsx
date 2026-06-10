import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useAnimations';
import { EXPERIENCE } from '../data/portfolioData';

const BriefcaseIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function Experience() {
  const [headingRef, headingVisible] = useScrollReveal(0.1);
  const [listRef, listVisible] = useScrollReveal(0.1);

  return (
    <section id="experience" style={{
      padding: '6rem 1.5rem',
      position: 'relative',
      background: 'linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.03), transparent)',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={headingRef}
          className={`reveal ${headingVisible ? 'visible' : ''}`}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <BriefcaseIcon />
            Experience
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: '1.1',
            marginTop: '0.75rem',
          }}>
            Professional{' '}
            <span className="gradient-text">Experience</span>
          </h2>
          <p style={{
            marginTop: '1rem',
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            maxWidth: '500px',
            margin: '1rem auto 0',
          }}>
            Hands-on experience building real-world AI/ML solutions.
          </p>
        </div>

        {/* Experience Timeline */}
        <div ref={listRef} style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '28px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, #2563eb, #06b6d4, transparent)',
          }} />

          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              className={`reveal ${listVisible ? 'visible' : ''}`}
              style={{
                transitionDelay: `${i * 150}ms`,
                display: 'flex',
                gap: '1.75rem',
                paddingLeft: '1rem',
                paddingBottom: '2.5rem',
                position: 'relative',
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: '20px',
                top: '8px',
                transform: 'translateX(-50%)',
                zIndex: 1,
              }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                  boxShadow: '0 0 16px rgba(37, 99, 235, 0.5)',
                  border: '2px solid var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />
                </div>
              </div>

              {/* Card */}
              <div style={{ paddingLeft: '2.5rem', flex: 1 }}>
                <motion.div
                  className="glass-card"
                  style={{
                    borderRadius: '20px',
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Top accent */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #2563eb, #06b6d4)',
                  }} />

                  {/* Header row */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                  }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(37,99,235,0.25), rgba(6,182,212,0.25))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        flexShrink: 0,
                      }}>
                        {exp.icon}
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '1.15rem',
                          fontWeight: '800',
                          color: 'var(--text-primary)',
                          marginBottom: '0.2rem',
                        }}>
                          {exp.role}
                        </h3>
                        <p style={{
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          color: 'var(--accent-cyan)',
                        }}>
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(37, 99, 235, 0.1)',
                        border: '1px solid rgba(37, 99, 235, 0.25)',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: 'var(--neon-blue)',
                        whiteSpace: 'nowrap',
                      }}>
                        ⏱️ {exp.duration}
                      </span>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(6, 182, 212, 0.1)',
                        border: '1px solid rgba(6, 182, 212, 0.25)',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: 'var(--accent-cyan)',
                        whiteSpace: 'nowrap',
                      }}>
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <p style={{
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '0.75rem',
                    }}>
                      Key Responsibilities
                    </p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {exp.responsibilities.map((resp, j) => (
                        <li key={j} style={{
                          display: 'flex',
                          gap: '0.75rem',
                          alignItems: 'flex-start',
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.6',
                        }}>
                          <span style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: 'rgba(37, 99, 235, 0.15)',
                            border: '1px solid rgba(37, 99, 235, 0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--neon-blue)',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}>
                            <CheckIcon />
                          </span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
