import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useAnimations';
import { PROJECTS } from '../data/portfolioData';

const ExternalLinkIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const GRADIENT_MAP = {
  'from-blue-500 to-cyan-600': 'linear-gradient(135deg, #2563eb, #06b6d4)',
  'from-purple-500 to-blue-600': 'linear-gradient(135deg, #8b5cf6, #2563eb)',
};

function ProjectCard({ project, index }) {
  const [ref, visible] = useScrollReveal(0.1);

  return (
    <motion.div
      ref={ref}
      className={`project-card reveal-scale ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${(index % 2) * 150}ms` }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {/* Visual header */}
      <div style={{
        height: '180px',
        background: GRADIENT_MAP[project.gradient] || 'linear-gradient(135deg, #2563eb, #06b6d4)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          width: '200px', height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
          top: '-60px', right: '-60px',
        }} />
        <div style={{
          position: 'absolute',
          width: '150px', height: '150px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          bottom: '-40px', left: '-30px',
        }} />

        {/* Accuracy badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          padding: '0.3rem 0.7rem',
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)',
          borderRadius: '9999px',
          fontSize: '0.72rem',
          fontWeight: '700',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
        }}>
          🎯 {project.accuracy} Accuracy
        </div>

        <span style={{ fontSize: '3.5rem', position: 'relative', zIndex: 1 }}>
          {project.emoji}
        </span>

        {/* Category badge */}
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          padding: '0.25rem 0.65rem',
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(8px)',
          borderRadius: '9999px',
          fontSize: '0.7rem',
          fontWeight: '600',
          color: 'rgba(255,255,255,0.9)',
        }}>
          {project.category}
        </span>
      </div>

      {/* Card content */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          fontSize: '1.05rem',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '0.6rem',
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.65',
          marginBottom: '1rem',
        }}>
          {project.description}
        </p>

        {/* Achievements */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{
            fontSize: '0.72rem',
            fontWeight: '700',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            marginBottom: '0.5rem',
          }}>
            Key Achievements
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {project.achievements.map((ach, i) => (
              <li key={i} style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'flex-start',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
              }}>
                <span style={{
                  width: '16px', height: '16px',
                  borderRadius: '50%',
                  background: 'rgba(37, 99, 235, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--neon-blue)',
                  flexShrink: 0,
                  marginTop: '1px',
                }}>
                  <CheckIcon />
                </span>
                {ach}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
          {project.tech.map((t) => (
            <span key={t} className="tech-badge" style={{ fontSize: '0.7rem' }}>{t}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: '0.78rem', padding: '0.5rem 1rem', flex: 1, justifyContent: 'center', textDecoration: 'none' }}
            aria-label={`View GitHub code for ${project.title}`}
          >
            <GithubIcon />
            GitHub Repo
          </a>
          <a
            href={project.liveUrl}
            className="btn-outline"
            style={{ fontSize: '0.78rem', padding: '0.5rem 1rem', flex: 1, justifyContent: 'center', textDecoration: 'none' }}
            aria-label={`View live demo of ${project.title}`}
          >
            <ExternalLinkIcon />
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [headingRef, headingVisible] = useScrollReveal(0.1);

  return (
    <section id="projects" style={{
      padding: '6rem 1.5rem',
      position: 'relative',
      background: 'linear-gradient(180deg, transparent, rgba(6, 182, 212, 0.03), transparent)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={headingRef}
          className={`reveal ${headingVisible ? 'visible' : ''}`}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="section-badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Portfolio
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: '1.1',
            marginTop: '0.75rem',
          }}>
            AI/ML{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p style={{
            marginTop: '1rem',
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            maxWidth: '520px',
            margin: '1rem auto 0',
          }}>
            Real-world machine learning projects built with industry-standard tools and pipelines.
          </p>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '2rem',
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)',
            background: 'var(--bg-card)',
          }}
        >
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
            Want to see more of my work?
          </p>
          <a
            href="https://github.com/asadrealone"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', display: 'inline-flex' }}
          >
            <GithubIcon />
            View All Projects on GitHub
          </a>
        </motion.div>

      </div>
    </section>
  );
}
