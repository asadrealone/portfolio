/**
 * Navbar – Fixed mobile menu, dark/light toggle in mobile, smooth animations
 * ─────────────────────────────────────────────────────────────────────────
 * Fixes applied:
 *  • Mobile menu uses fixed overlay so it works on all devices (iOS/Android)
 *  • Backdrop click closes the menu
 *  • Theme toggle present in both desktop AND mobile menu
 *  • System theme preference respected on first visit (via App.jsx)
 *  • Framer Motion slide-in from top with stagger on nav items
 *  • Body scroll locked when menu is open (touch-action safe)
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

// ── Animation variants ───────────────────────────
const menuVariants = {
  hidden:  { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.2,  ease: [0.4, 0, 1, 1]  } },
};

const itemVariants = {
  hidden:  { opacity: 0, x: -18 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.05, duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  }),
};

// ── Component ────────────────────────────────────
export default function Navbar({ isDark, onToggleTheme }) {
  const { scrolled, activeSection } = useNavScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const scrollTo = useCallback((id) => {
    closeMenu();
    // Small delay so menu close animation plays before scrolling
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }, [closeMenu]);

  // Close on resize to desktop breakpoint
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 900) closeMenu(); };
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, [closeMenu]);

  // Lock body scroll on mobile when menu is open (iOS-safe)
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

            {/* Logo */}
            <button
              onClick={() => scrollTo('hero')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
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

            {/* Desktop Nav Links */}
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

            {/* Right Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>

              {/* Theme Toggle — always visible */}
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

              {/* Resume button — desktop only */}
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
                style={{
                  display: 'none',        // overridden by .mobile-only CSS
                  alignItems: 'center', justifyContent: 'center',
                  background: menuOpen ? 'rgba(37,99,235,0.15)' : 'var(--bg-card)',
                  border: `1px solid ${menuOpen ? 'rgba(37,99,235,0.4)' : 'var(--glass-border)'}`,
                  borderRadius: '10px',
                  width: '40px', height: '40px',
                  cursor: 'pointer', color: 'var(--text-secondary)',
                  flexShrink: 0,
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                className="mobile-only"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={menuOpen ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
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

      {/* ── Mobile Menu Overlay ─────────────────── */}
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
                position: 'fixed',
                inset: 0,
                zIndex: 998,
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(2px)',
              }}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              key="mobile-menu"
              id="mobile-nav-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: 'fixed',
                top: '68px',
                left: 0,
                right: 0,
                zIndex: 999,
                background: 'rgba(10, 16, 30, 0.97)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: '1px solid var(--glass-border)',
                borderTop: '1px solid rgba(37,99,235,0.25)',
                maxHeight: 'calc(100dvh - 68px)',
                overflowY: 'auto',
              }}
            >
              <div style={{ padding: '1.25rem 1.5rem 2rem' }}>

                {/* Nav links */}
                <nav aria-label="Mobile navigation">
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
                        background: activeSection === link.id
                          ? 'rgba(37, 99, 235, 0.12)'
                          : 'transparent',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '0.85rem 1rem',
                        textAlign: 'left',
                        color: activeSection === link.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                        fontSize: '1rem',
                        fontWeight: activeSection === link.id ? '700' : '500',
                        cursor: 'pointer',
                        marginBottom: '0.2rem',
                        transition: 'background 0.2s, color 0.2s',
                        letterSpacing: '0.01em',
                      }}
                      aria-current={activeSection === link.id ? 'page' : undefined}
                    >
                      {/* Active indicator dot */}
                      <span style={{
                        width: '6px', height: '6px',
                        borderRadius: '50%',
                        background: activeSection === link.id ? 'var(--accent-cyan)' : 'var(--glass-border)',
                        flexShrink: 0,
                        transition: 'background 0.2s',
                      }} />
                      {link.label}
                    </motion.button>
                  ))}
                </nav>

                {/* Divider */}
                <div style={{
                  height: '1px',
                  background: 'var(--glass-border)',
                  margin: '1rem 0',
                }} />

                {/* Theme toggle row in mobile menu */}
                <motion.div
                  custom={NAV_LINKS.length}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--glass-border)',
                    marginBottom: '0.85rem',
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
                    {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
                  </span>
                  <motion.button
                    onClick={onToggleTheme}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: isDark ? 'rgba(37,99,235,0.15)' : 'rgba(234,179,8,0.15)',
                      border: `1px solid ${isDark ? 'rgba(37,99,235,0.35)' : 'rgba(234,179,8,0.35)'}`,
                      borderRadius: '8px',
                      width: '36px', height: '36px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      color: isDark ? 'var(--neon-blue)' : '#f59e0b',
                    }}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {isDark ? <SunIcon /> : <MoonIcon />}
                  </motion.button>
                </motion.div>

                {/* Download Resume */}
                <motion.a
                  custom={NAV_LINKS.length + 1}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  href="/Asad_Ali_AI_ML_Resume.pdf"
                  download="Asad_Ali_AI_ML_Resume.pdf"
                  className="btn-primary"
                  style={{ justifyContent: 'center', fontSize: '0.95rem', textDecoration: 'none', width: '100%' }}
                  aria-label="Download Resume PDF"
                >
                  <DownloadIcon />
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
