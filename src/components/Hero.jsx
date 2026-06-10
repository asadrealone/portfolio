import { motion } from 'framer-motion';
import { useTypingEffect } from '../hooks/useAnimations';
import { HERO_TYPING_TEXTS, HERO_DATA } from '../data/portfolioData';

const BrainIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9.5 2a2.5 2.5 0 0 1 5 0v14.5a2.5 2.5 0 0 1-5 0V2z" opacity="0"/>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/>
  </svg>
);

const ArrowDown = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 5v14M5 12l7 7 7-7"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

// Floating AI/ML keyword nodes for visual flair
const AI_KEYWORDS = [
  { text: 'Neural Networks', x: '8%', y: '20%', delay: 0 },
  { text: 'Deep Learning', x: '82%', y: '15%', delay: 0.3 },
  { text: 'Python', x: '5%', y: '70%', delay: 0.6 },
  { text: 'Scikit-learn', x: '80%', y: '72%', delay: 0.9 },
  { text: 'Data Science', x: '15%', y: '88%', delay: 1.2 },
  { text: 'TensorFlow', x: '70%', y: '88%', delay: 0.5 },
];

export default function Hero() {
  const typedText = useTypingEffect(HERO_TYPING_TEXTS, 70, 2200);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* Animated background */}
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="grid-bg" />
      </div>

      {/* Floating AI keywords */}
      {AI_KEYWORDS.map((kw) => (
        <motion.div
          key={kw.text}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ delay: kw.delay + 1.2, duration: 0.8 }}
          style={{
            position: 'absolute',
            left: kw.x,
            top: kw.y,
            padding: '0.3rem 0.75rem',
            borderRadius: '9999px',
            border: '1px solid rgba(37, 99, 235, 0.3)',
            background: 'rgba(37, 99, 235, 0.06)',
            fontSize: '0.7rem',
            fontWeight: '600',
            color: 'rgba(96, 165, 250, 0.7)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            display: 'none',
          }}
          className="hero-keyword"
        >
          {kw.text}
        </motion.div>
      ))}

      {/* Content */}
      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '0 1.5rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Status badge */}
          <motion.div variants={item} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
            <span className="section-badge animate-pulse-glow" style={{ gap: '0.5rem' }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
                display: 'inline-block',
                animation: 'pulse-glow-green 2s ease-in-out infinite',
              }} />
              Open to AI/ML Opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={item}>
            <h1 style={{
              fontSize: 'clamp(2.6rem, 8vw, 5rem)',
              fontWeight: '900',
              lineHeight: '1.05',
              marginBottom: '0.75rem',
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '-0.02em',
            }}>
              <span style={{ color: 'var(--text-primary)' }}>Hi, I'm{' '}</span>
              <span className="gradient-text">Asad Ali</span>
            </h1>
          </motion.div>

          {/* Title */}
          <motion.div variants={item} style={{ marginBottom: '1rem' }}>
            <div style={{
              fontSize: 'clamp(1rem, 3vw, 1.25rem)',
              fontWeight: '600',
              color: 'var(--text-secondary)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              {HERO_DATA.title}
            </div>
          </motion.div>

          {/* Typing effect */}
          <motion.div variants={item} style={{ marginBottom: '1.5rem' }}>
            <p style={{
              fontSize: 'clamp(1.1rem, 3.5vw, 1.55rem)',
              color: 'var(--text-secondary)',
              fontWeight: '400',
              lineHeight: '1.5',
            }}>
              I am a{' '}
              <span style={{ color: 'var(--accent-cyan)', fontWeight: '700' }}>
                {typedText}
              </span>
              <span className="typing-cursor" aria-hidden="true" />
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={item} style={{ marginBottom: '1.5rem' }}>
            <p style={{
              fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              maxWidth: '680px',
              margin: '0 auto',
              fontWeight: '400',
            }}>
              {HERO_DATA.tagline}
            </p>
          </motion.div>

          {/* Summary */}
          <motion.div variants={item} style={{ marginBottom: '2.5rem' }}>
            <p style={{
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
              color: 'var(--text-muted)',
              lineHeight: '1.8',
              maxWidth: '640px',
              margin: '0 auto',
            }}>
              {HERO_DATA.summary}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '3.5rem',
            }}
          >
            <button
              className="btn-primary"
              onClick={() => scrollTo('projects')}
              id="hero-view-projects-btn"
            >
              <FolderIcon />
              View Projects
            </button>
            <a
              href="/Asad_Ali_AI_ML_Resume.pdf"
              download="Asad_Ali_AI_ML_Resume.pdf"
              className="btn-outline"
              id="hero-download-resume-btn"
              style={{ textDecoration: 'none' }}
              aria-label="Download Asad Ali AI/ML Resume PDF"
            >
              <DownloadIcon />
              Download Resume
            </a>
            <a
              href="/Asad_Ali_AI_ML_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              id="hero-view-resume-btn"
              style={{ textDecoration: 'none' }}
              aria-label="View Asad Ali AI/ML Resume in browser"
            >
              <EyeIcon />
              View Resume
            </a>
            <button
              className="btn-ghost"
              onClick={() => scrollTo('contact')}
              id="hero-contact-btn"
            >
              <MailIcon />
              Contact Me
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
              maxWidth: '600px',
              margin: '0 auto',
            }}
            className="hero-stats-grid"
          >
            {[
              { value: '2+', label: 'ML Projects' },
              { value: '4mo', label: 'Internship' },
              { value: '85%+', label: 'Accuracy' },
              { value: '3.75', label: 'CGPA' },
            ].map((stat) => (
              <div key={stat.label} className="hero-stat-card">
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => scrollTo('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{
            position: 'absolute',
            bottom: '-90px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
          whileHover={{ color: 'var(--accent-cyan)', y: -2 }}
          aria-label="Scroll down"
        >
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
