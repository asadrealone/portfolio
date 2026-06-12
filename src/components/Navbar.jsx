/**
 * Navbar
 * – Logo: "ASAD" (gradient)
 * – Desktop: nav links + theme toggle + Resume button
 * – Mobile: hamburger opens full-screen overlay with links + theme toggle
 * – Theme toggle is ALWAYS visible (desktop top-right, mobile inside menu)
 * – Instagram + GitHub + LinkedIn social icons in mobile footer
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavScroll } from '../hooks/useAnimations';
import { NAV_LINKS } from '../data/portfolioData';

// ── Icons ────────────────────────────────────────
const MoonIcon = () => (
  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const SunIcon = () => (
  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const XIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

// ── Mobile menu animation ────────────────────────
const menuVariants = {
  hidden:  { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
};
const itemVariants = {
  hidden:  { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.045, duration: 0.22, ease: [0.4, 0, 0.2, 1] },
  }),
};

// ── Component ────────────────────────────────────
export default function Navbar({ isDark, onToggleTheme }) {
  const { scrolled, activeSection } = useNavScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const scrollTo = useCallback((id) => {
    closeMenu();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }, [closeMenu]);

  // Close on desktop resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 900) closeMenu(); };
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, [closeMenu]);

  // iOS-safe scroll lock
  useEffect(() => {
    if (menuOpen) {
      const y = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${y}px`;
      document.body.style.width = '100%';
    } else {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (top) window.scrollTo(0, parseInt(top, 10) * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* ── Navbar bar ── */}
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

            {/* Logo — "ASAD" */}
            <button
              onClick={() => scrollTo('hero')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
              aria-label="Go to top"
            >
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '900',
                fontFamily: 'Poppins, sans-serif',
                letterSpacing: '0.05em',
                background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                ASAD
              </span>
            </button>

            {/* Desktop nav links */}
            <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.35rem 0.7rem', borderRadius: '8px' }}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>

              {/* Theme toggle — ALWAYS visible on both desktop & mobile */}
              <motion.button
                onClick={onToggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  width: '38px', height: '38px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: isDark ? '#facc15' : '#6366f1',
                  flexShrink: 0,
                }}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isDark ? 'sun' : 'moon'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex' }}
                  >
                    {isDark ? <SunIcon /> : <MoonIcon />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {/* Resume — desktop only */}
              <a
                href="/Asad_Ali_AI_ML_Resume.pdf"
                download="Asad_Ali_AI_ML_Resume.pdf"
                className="btn-primary desktop-only"
                style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem', gap: '0.4rem', textDecoration: 'none', flexShrink: 0 }}
                aria-label="Download Resume"
              >
                <DownloadIcon />
                Resume
              </a>

              {/* Hamburger — mobile only */}
              <motion.button
                onClick={() => setMenuOpen((o) => !o)}
                whileTap={{ scale: 0.9 }}
                className="mobile-only"
                style={{
                  display: 'none',
                  alignItems: 'center', justifyContent: 'center',
                  background: menuOpen ? 'rgba(37,99,235,0.15)' : 'var(--bg-card)',
                  border: `1px solid ${menuOpen ? 'rgba(37,99,235,0.45)' : 'var(--glass-border)'}`,
                  borderRadius: '10px',
                  width: '38px', height: '38px',
                  cursor: 'pointer', color: 'var(--text-secondary)',
                  flexShrink: 0,
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={menuOpen ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90, opacity: 0 }}
                    transition={{ duration: 0.17 }}
                    style={{ display: 'flex' }}
                  >
                    {menuOpen ? <XIcon /> : <MenuIcon />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              style={{
                position: 'fixed', inset: 0,
                zIndex: 998,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(3px)',
              }}
              aria-hidden="true"
            />

            {/* Menu panel */}
            <motion.div
              key="panel"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: 'fixed',
                top: '68px', left: 0, right: 0,
                zIndex: 999,
                background: 'rgba(8, 14, 28, 0.98)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                borderBottom: '1px solid rgba(37,99,235,0.2)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                maxHeight: 'calc(100dvh - 68px)',
                overflowY: 'auto',
              }}
            >
              <div style={{ padding: '1.5rem 1.25rem 2rem' }}>

                {/* Nav links */}
                <p style={{
                  fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.1em',
                  color: 'var(--text-muted)', textTransform: 'uppercase',
                  marginBottom: '0.75rem', paddingLeft: '0.5rem',
                }}>
                  Navigation
                </p>

                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => scrollTo(link.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      width: '100%',
                      background: activeSection === link.id ? 'rgba(37,99,235,0.15)' : 'transparent',
                      border: activeSection === link.id ? '1px solid rgba(37,99,235,0.25)' : '1px solid transparent',
                      borderRadius: '10px',
                      padding: '0.85rem 1rem',
                      textAlign: 'left',
                      color: activeSection === link.id ? '#60a5fa' : 'var(--text-secondary)',
                      fontSize: '1rem',
                      fontWeight: activeSection === link.id ? '700' : '500',
                      cursor: 'pointer',
                      marginBottom: '0.3rem',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                      background: activeSection === link.id ? '#60a5fa' : 'rgba(148,163,184,0.3)',
                      transition: 'background 0.2s',
                    }} />
                    {link.label}
                    {activeSection === link.id && (
                      <span style={{
                        marginLeft: 'auto', fontSize: '0.65rem', fontWeight: '700',
                        background: 'rgba(37,99,235,0.2)', color: '#60a5fa',
                        padding: '0.15rem 0.5rem', borderRadius: '6px',
                      }}>
                        Current
                      </span>
                    )}
                  </motion.button>
                ))}

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(148,163,184,0.1)', margin: '1.25rem 0' }} />

                {/* Theme toggle row */}
                <motion.div
                  custom={NAV_LINKS.length}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.85rem 1rem', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(148,163,184,0.1)',
                    marginBottom: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1rem' }}>{isDark ? '🌙' : '☀️'}</span>
                    <div>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {isDark ? 'Dark Mode' : 'Light Mode'}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                        Tap to switch theme
                      </div>
                    </div>
                  </div>
                  {/* Toggle switch */}
                  <button
                    onClick={onToggleTheme}
                    style={{
                      width: '48px', height: '26px',
                      borderRadius: '13px',
                      background: isDark ? '#2563eb' : '#e2e8f0',
                      border: 'none', cursor: 'pointer',
                      position: 'relative',
                      transition: 'background 0.25s ease',
                      flexShrink: 0,
                    }}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    <motion.div
                      animate={{ x: isDark ? 24 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      style={{
                        width: '20px', height: '20px',
                        borderRadius: '50%',
                        background: 'white',
                        position: 'absolute',
                        top: '3px',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                      }}
                    />
                  </button>
                </motion.div>

                {/* Download Resume */}
                <motion.a
                  custom={NAV_LINKS.length + 1}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  href="/Asad_Ali_AI_ML_Resume.pdf"
                  download="Asad_Ali_AI_ML_Resume.pdf"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.9rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                    color: 'white', fontWeight: '700', fontSize: '0.95rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(37,99,235,0.35)',
                  }}
                >
                  <DownloadIcon />
                  Download Resume
                </motion.a>

                {/* Social links */}
                <motion.div
                  custom={NAV_LINKS.length + 2}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ marginTop: '1.25rem', display: 'flex', gap: '0.6rem', justifyContent: 'center' }}
                >
                  {[
                    { label: 'GitHub',    href: 'https://github.com/asadrealone',    color: '#e2e8f0' },
                    { label: 'LinkedIn',  href: 'https://linkedin.com/in/asadrealone', color: '#60a5fa' },
                    { label: 'Instagram', href: 'https://instagram.com/asadrealone', color: '#f472b6' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(148,163,184,0.12)',
                        color: s.color,
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textDecoration: 'none',
                        transition: 'background 0.2s',
                      }}
                    >
                      {s.label}
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
