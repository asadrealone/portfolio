/**
 * Hero Section
 * ─────────────────────────────────────────────────────────────
 * Updated: Two-column layout on desktop (text left, photo right)
 * Photo: professional headshot with gradient glow ring
 * Mobile: stacks vertically, photo above text, properly sized
 */

import { motion } from 'framer-motion';
import { useTypingEffect } from '../hooks/useAnimations';
import { HERO_TYPING_TEXTS, HERO_DATA } from '../data/portfolioData';

// ── Icons ────────────────────────────────────────
const DownloadIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const ArrowDown = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 5v14M5 12l7 7 7-7"/>
  </svg>
);

// ── Animation variants ───────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

const photoVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.92 },
  show:   { opacity: 1, x: 0,  scale: 1, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.3 } },
};

// ── Hero Image Component ─────────────────────────
function HeroPhoto() {
  return (
    <motion.div
      variants={photoVariants}
      initial="hidden"
      animate="show"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
      className="hero-photo-wrapper"
    >
      {/* Outer glow ring */}
      <div style={{
        position: 'absolute',
        inset: '-4px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 50%, #8b5cf6 100%)',
        opacity: 0.7,
        filter: 'blur(2px)',
        animation: 'spin-slow 8s linear infinite',
        zIndex: 0,
      }} aria-hidden="true" />

      {/* Outer ring border */}
      <div style={{
        position: 'absolute',
        inset: '0',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #2563eb, #06b6d4, #8b5cf6)',
        zIndex: 1,
      }} aria-hidden="true" />

      {/* Inner white circle (photo container) */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        borderRadius: '50%',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, rgba(37,99,235,0.15) 0%, rgba(6,182,212,0.1) 100%)',
        margin: '3px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      className="hero-photo-inner"
      >
        <img
          src="/asad-hero.jpg"
          alt="Asad Ali – Aspiring AI/ML Engineer"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          style={{
            display: 'block',
            objectFit: 'cover',
            objectPosition: 'center 10%',
            width: '100%',
            height: '100%',
          }}
          className="hero-photo-img"
        />
      </div>

      {/* Floating badge – "Available" */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '6%',
          right: '-2%',
          background: 'rgba(22, 163, 74, 0.15)',
          border: '1px solid rgba(22,163,74,0.35)',
          backdropFilter: 'blur(12px)',
          borderRadius: '10px',
          padding: '0.4rem 0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.7rem',
          fontWeight: '700',
          color: '#4ade80',
          zIndex: 3,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: '#22c55e',
          boxShadow: '0 0 6px #22c55e',
          animation: 'pulse-glow-green 2s ease-in-out infinite',
        }} />
        Available
      </motion.div>

      {/* Floating tech badge */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
        style={{
          position: 'absolute',
          top: '8%',
          left: '-4%',
          background: 'rgba(37,99,235,0.15)',
          border: '1px solid rgba(37,99,235,0.3)',
          backdropFilter: 'blur(12px)',
          borderRadius: '10px',
          padding: '0.4rem 0.75rem',
          fontSize: '0.68rem',
          fontWeight: '700',
          color: 'var(--neon-blue)',
          zIndex: 3,
          whiteSpace: 'nowrap',
        }}
      >
        🤖 AI/ML Engineer
      </motion.div>
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────
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
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="grid-bg" />
      </div>

      {/* ── Two-column layout container ── */}
      <div className="hero-inner" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── LEFT: Text content ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="hero-text-col"
        >
          {/* Status badge */}
          <motion.div variants={item} style={{ marginBottom: '1.5rem' }}>
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
              fontSize: 'clamp(2.2rem, 6vw, 4.2rem)',
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
          <motion.div variants={item} style={{ marginBottom: '0.75rem' }}>
            <div style={{
              fontSize: 'clamp(0.85rem, 2.2vw, 1rem)',
              fontWeight: '600',
              color: 'var(--text-secondary)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              {HERO_DATA.title}
            </div>
          </motion.div>

          {/* Typing effect */}
          <motion.div variants={item} style={{ marginBottom: '1.25rem' }}>
            <p style={{
              fontSize: 'clamp(1rem, 3vw, 1.4rem)',
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
          <motion.div variants={item} style={{ marginBottom: '2rem' }}>
            <p style={{
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              color: 'var(--text-secondary)',
              lineHeight: '1.75',
              maxWidth: '520px',
              fontWeight: '400',
            }}>
              {HERO_DATA.tagline}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
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
              gap: '0.75rem',
              maxWidth: '480px',
            }}
            className="hero-stats-grid"
          >
            {[
              { value: '2+',   label: 'ML Projects' },
              { value: '4mo',  label: 'Internship'  },
              { value: '85%+', label: 'Accuracy'    },
              { value: '3.75', label: 'CGPA'        },
            ].map((stat) => (
              <div key={stat.label} className="hero-stat-card">
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Photo ── */}
        <div className="hero-photo-col">
          <HeroPhoto />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
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
        aria-label="Scroll down to About section"
      >
        <span>Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown />
        </motion.div>
      </motion.button>
    </section>
  );
}
