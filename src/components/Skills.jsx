import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import { SKILLS, SKILL_TOOLS, CORE_CONCEPTS } from '../data/portfolioData';

const CATEGORY_ICONS = {
  'Programming Languages': '⌨️',
  'Machine Learning': '🤖',
  'Data Analytics': '📊',
  'Tools & Technologies': '🛠️',
  'Core Concepts': '💡',
};

const CATEGORY_COLORS = {
  'Programming Languages': 'from-blue-500 to-cyan-500',
  'Machine Learning': 'from-purple-500 to-pink-500',
  'Data Analytics': 'from-cyan-500 to-teal-500',
};

function SkillBar({ name, level, visible, delay }) {
  const fillRef = useRef(null);

  useEffect(() => {
    if (!visible || !fillRef.current) return;
    const timer = setTimeout(() => {
      if (fillRef.current) fillRef.current.style.width = `${level}%`;
    }, delay);
    return () => clearTimeout(timer);
  }, [visible, level, delay]);

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
          {name}
        </span>
        <span style={{
          fontSize: '0.78rem',
          fontWeight: '700',
          color: 'var(--accent-cyan)',
          background: 'rgba(6,182,212,0.1)',
          border: '1px solid rgba(6,182,212,0.2)',
          borderRadius: '6px',
          padding: '0.1rem 0.45rem',
        }}>
          {level}%
        </span>
      </div>
      <div className="skill-bar-track">
        <div
          ref={fillRef}
          className="skill-bar-fill"
          style={{ transitionDelay: `${delay}ms` }}
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} proficiency: ${level}%`}
        />
      </div>
    </div>
  );
}

function CategoryCard({ category, skills, visible, cardDelay }) {
  return (
    <div
      className={`glass-card reveal-scale ${visible ? 'visible' : ''}`}
      style={{
        borderRadius: '16px',
        padding: '1.75rem',
        transitionDelay: `${cardDelay}ms`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top gradient accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #2563eb, #06b6d4)',
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem',
      }}>
        <span style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(6,182,212,0.2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
        }}>
          {CATEGORY_ICONS[category] || '💡'}
        </span>
        <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
          {category}
        </h3>
      </div>

      {skills.map((skill, i) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          visible={visible}
          delay={cardDelay + i * 120}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  const [headingRef, headingVisible] = useScrollReveal(0.1);
  const [gridRef, gridVisible] = useScrollReveal(0.05);
  const [toolsRef, toolsVisible] = useScrollReveal(0.1);

  const categories = Object.entries(SKILLS);

  return (
    <section id="skills" style={{
      padding: '6rem 1.5rem',
      position: 'relative',
      background: 'linear-gradient(180deg, transparent, rgba(37, 99, 235, 0.03), transparent)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={headingRef}
          className={`reveal ${headingVisible ? 'visible' : ''}`}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
            Technical Skills
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: '1.1',
            marginTop: '0.75rem',
          }}>
            My AI/ML{' '}
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p style={{
            marginTop: '1rem',
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            maxWidth: '520px',
            margin: '1rem auto 0',
          }}>
            Tools and technologies I use to build intelligent, data-driven solutions.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {categories.map(([category, skills], i) => (
            <CategoryCard
              key={category}
              category={category}
              skills={skills}
              visible={gridVisible}
              cardDelay={i * 100}
            />
          ))}
        </div>

        {/* Tools & Technologies */}
        <div
          ref={toolsRef}
          className={`reveal ${toolsVisible ? 'visible' : ''}`}
          style={{
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(12px)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem',
          }}>
            <span style={{ fontSize: '1.2rem' }}>🛠️</span>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              Tools & Technologies
            </h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {SKILL_TOOLS.map((tool) => (
              <span key={tool} className="tech-badge">{tool}</span>
            ))}
          </div>
        </div>

        {/* Core Concepts */}
        <div
          className={`reveal ${toolsVisible ? 'visible' : ''} delay-200`}
          style={{
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem',
          }}>
            <span style={{ fontSize: '1.2rem' }}>💡</span>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              Core Concepts
            </h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {CORE_CONCEPTS.map((concept) => (
              <span key={concept} className="tech-badge concept-badge">{concept}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
