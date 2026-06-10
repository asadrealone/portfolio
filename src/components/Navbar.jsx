import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavScroll } from '../hooks/useAnimations';
import { NAV_LINKS } from '../data/portfolioData';

const MoonIcon = () => (
  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const SunIcon = () => (
  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const XIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

export default function Navbar({ isDark, onToggleTheme }) {
  const { scrolled, activeSection } = useNavScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            aria-label="Go to top"
          >
            <span style={{
              fontSize: '1.35rem',
              fontWeight: '900',
              fontFamily: 'Poppins, sans-serif',
              background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Asad<span style={{ WebkitTextFillColor: 'var(--text-secondary)', background: 'none', backgroundClip: 'unset' }}>.ai</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0.35rem 0.7rem', borderRadius: '8px',
                }}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>

            {/* Theme toggle */}
            <motion.button
              onClick={onToggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--glass-border)',
                borderRadius: '10px',
                width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-secondary)',
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </motion.button>

            {/* Download Resume — desktop only */}
            <a
              href="/Asad_Ali_AI_ML_Resume.pdf"
              download="Asad_Ali_AI_ML_Resume.pdf"
              className="btn-primary desktop-only"
              style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem', gap: '0.4rem' }}
              aria-label="Download Resume"
            >
              <DownloadIcon />
              Resume
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--bg-card)',
                border: '1px solid var(--glass-border)',
                borderRadius: '10px',
                width: '36px', height: '36px',
                cursor: 'pointer', color: 'var(--text-secondary)',
              }}
              className="mobile-only"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'rgba(15, 23, 42, 0.97)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid var(--glass-border)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{
                    background: activeSection === link.id
                      ? 'rgba(37, 99, 235, 0.12)'
                      : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    color: activeSection === link.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <a
                href="/Asad_Ali_AI_ML_Resume.pdf"
                download="Asad_Ali_AI_ML_Resume.pdf"
                className="btn-primary"
                style={{ marginTop: '0.75rem', justifyContent: 'center', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                <DownloadIcon />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
