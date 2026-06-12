import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load below-fold sections
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Certifications = lazy(() => import('./components/Certifications'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function SectionLoader() {
  return (
    <div style={{
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        border: '2px solid var(--glass-border)',
        borderTopColor: 'var(--accent-cyan)',
        borderRadius: '50%',
        animation: 'spin-slow 0.8s linear infinite',
      }} />
    </div>
  );
}

function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.4)',
        zIndex: 50,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        animation: 'scaleIn 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(37, 99, 235, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 99, 235, 0.4)';
      }}
      aria-label="Scroll to top"
      id="scroll-to-top-btn"
    >
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  );
}

export default function App() {
  // Initialise theme: stored pref → system pref → dark default
  const getInitialTheme = () => {
    const stored = localStorage.getItem('portfolio-theme');
    if (stored) return stored === 'dark';
    return !window.matchMedia('(prefers-color-scheme: light)').matches;
  };

  const [isDark, setIsDark] = useState(() => {
    // During SSR / first render, default to dark; resolved in effect
    return true;
  });

  useEffect(() => {
    const dark = getInitialTheme();
    setIsDark(dark);
    if (!dark) {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.body.classList.toggle('light', !next);
      localStorage.setItem('portfolio-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Subtle noise texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Navbar */}
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      {/* Main content */}
      <main>
        {/* Hero loads immediately */}
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Certifications />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Achievements />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Scroll to top FAB */}
      <ScrollToTop />
    </div>
  );
}
