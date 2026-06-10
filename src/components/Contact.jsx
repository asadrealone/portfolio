/**
 * Contact Section
 * ──────────────────────────────────────────────────
 * Features:
 *  • EmailJS integration (credentials loaded from .env)
 *  • Full form validation (required fields, email format)
 *  • Loading / success / error states
 *  • Copy-to-clipboard with Toast notifications
 *  • Social links (GitHub, LinkedIn, Email, Phone)
 * ──────────────────────────────────────────────────
 */

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useScrollReveal } from '../hooks/useAnimations';
import { CONTACT_INFO, SOCIAL_LINKS } from '../data/portfolioData';
import { EMAILJS_CONFIG, isEmailJSConfigured } from '../config/emailjs';
import Toast from './Toast';

// ─── Icon Components ──────────────────────────────
const ICONS = {
  github: (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  email: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  phone: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
};

// ─── Validation ───────────────────────────────────
function validate(data) {
  const errors = {};
  if (!data.name.trim())    errors.name    = 'Name is required';
  if (!data.email.trim())   errors.email   = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
                            errors.email   = 'Enter a valid email address';
  if (!data.subject.trim()) errors.subject = 'Subject is required';
  if (!data.message.trim()) errors.message = 'Message is required';
  else if (data.message.trim().length < 20)
                            errors.message = 'Message must be at least 20 characters';
  return errors;
}

// ─── Copy Button ──────────────────────────────────
function CopyButton({ text, onCopied }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopied?.(text);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may be blocked – silent fail
    }
  }, [text, onCopied]);

  return (
    <button
      onClick={handleCopy}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
      aria-label={`Copy ${text}`}
      style={{
        background: copied ? 'rgba(34,197,94,0.12)' : 'rgba(37,99,235,0.1)',
        border: `1px solid ${copied ? 'rgba(34,197,94,0.35)' : 'rgba(37,99,235,0.25)'}`,
        borderRadius: '7px',
        padding: '0.22rem 0.55rem',
        fontSize: '0.68rem',
        fontWeight: '700',
        color: copied ? '#4ade80' : 'var(--neon-blue)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        flexShrink: 0,
        letterSpacing: '0.02em',
      }}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

// ─── Contact info rows ────────────────────────────
const CONTACT_ITEMS = [
  {
    icon: ICONS.phone,
    label: 'Phone',
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`,
    copyText: CONTACT_INFO.phone,
    external: false,
  },
  {
    icon: ICONS.email,
    label: 'Email',
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    copyText: CONTACT_INFO.email,
    external: false,
  },
  {
    icon: ICONS.linkedin,
    label: 'LinkedIn',
    value: CONTACT_INFO.linkedin,
    href: CONTACT_INFO.linkedinUrl,
    copyText: CONTACT_INFO.linkedin,
    external: true,
  },
  {
    icon: ICONS.github,
    label: 'GitHub',
    value: CONTACT_INFO.github,
    href: CONTACT_INFO.githubUrl,
    copyText: CONTACT_INFO.github,
    external: true,
  },
];

// ─── Field component ──────────────────────────────
function Field({ label, error, children }) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontSize: '0.78rem',
        fontWeight: '600',
        color: 'var(--text-secondary)',
        marginBottom: '0.375rem',
        letterSpacing: '0.02em',
      }}>
        {label} <span style={{ color: '#f87171' }}>*</span>
      </label>
      {children}
      {error && (
        <p role="alert" style={{ color: '#f87171', fontSize: '0.72rem', marginTop: '0.3rem' }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────
export default function Contact() {
  const [headingRef, headingVisible] = useScrollReveal(0.1);

  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors,   setErrors]   = useState({});
  const [status,   setStatus]   = useState('idle'); // idle | sending | success | error

  // Toast state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast((t) => ({ ...t, show: false }));
  }, []);

  // Handle copy-to-clipboard toast
  const handleCopied = useCallback((text) => {
    showToast(`"${text}" copied to clipboard!`, 'info');
  }, [showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const errs = validate(formData);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');

    try {
      if (isEmailJSConfigured()) {
        // ── Real EmailJS send ──────────────────────
        // Template variables must exactly match your EmailJS template:
        //   {{name}}, {{email}}, {{subject}}, {{message}}
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            name:     formData.name,
            email:    formData.email,
            subject:  formData.subject,
            message:  formData.message,
            reply_to: formData.email,
          },
          { publicKey: EMAILJS_CONFIG.publicKey }
        );
      } else {
        // ── Demo mode (no credentials configured) ──
        // Simulate network delay for UI preview
        await new Promise((r) => setTimeout(r, 1500));
        console.info(
          '[Contact Form] EmailJS not configured. ' +
          'Add VITE_EMAILJS_* variables to your .env file. ' +
          'See .env.example for instructions.'
        );
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      showToast('Message sent successfully!', 'success');
      setTimeout(() => setStatus('idle'), 6000);

    } catch (err) {
      console.error('[EmailJS]', err);
      setStatus('error');
      showToast('Failed to send message. Please try again.', 'error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const isSending = status === 'sending';

  return (
    <section id="contact" style={{ padding: '6rem 1.5rem', position: 'relative' }}>

      {/* Global toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Section header ── */}
        <div
          ref={headingRef}
          className={`reveal ${headingVisible ? 'visible' : ''}`}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Get In Touch
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: '1.1',
            marginTop: '0.75rem',
          }}>
            Let's{' '}
            <span className="gradient-text">Connect</span>
          </h2>
          <p style={{
            marginTop: '1rem',
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            maxWidth: '500px',
            margin: '1rem auto 0',
          }}>
            Interested in AI/ML collaboration, internships, or just want to talk tech? I'd love to hear from you!
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>

          {/* ── Left: Contact info ── */}
          <div className={`reveal-left ${headingVisible ? 'visible' : ''}`}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              Contact Information
            </h3>

            {CONTACT_ITEMS.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  marginBottom: '0.75rem',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(8px)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.35)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,99,235,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {/* Icon bubble */}
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '11px',
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(6,182,212,0.2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--neon-blue)',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.15rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    fontWeight: '700',
                  }}>
                    {item.label}
                  </div>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                  >
                    {item.value}
                  </a>
                </div>

                <CopyButton text={item.copyText} onCopied={handleCopied} />
              </motion.div>
            ))}

            {/* Social links */}
            <div style={{ marginTop: '2rem' }}>
              <p style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                marginBottom: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: '700',
              }}>
                Find Me On
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={link.label}
                    title={link.label}
                  >
                    {ICONS[link.icon]}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div style={{
              marginTop: '2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.75rem 1.25rem',
              background: 'rgba(34, 197, 94, 0.08)',
              border: '1px solid rgba(34, 197, 94, 0.22)',
              borderRadius: '12px',
              fontSize: '0.875rem',
              color: '#4ade80',
              fontWeight: '500',
            }}>
              <span style={{
                width: '9px', height: '9px',
                borderRadius: '50%', background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
                animation: 'pulse-glow-green 2s ease-in-out infinite',
                flexShrink: 0,
              }} />
              Available for internships &amp; collaborations
            </div>
          </div>

          {/* ── Right: Contact form ── */}
          <div className={`reveal-right ${headingVisible ? 'visible' : ''}`}>
            <div style={{
              padding: '2rem',
              borderRadius: '20px',
              border: '1px solid var(--glass-border)',
              background: 'var(--bg-card)',
              backdropFilter: 'blur(16px)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #2563eb, #06b6d4)',
              }} />

              {/* ── Success state ── */}
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '2.5rem 1rem' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                    style={{ fontSize: '4rem', marginBottom: '1rem' }}
                  >
                    ✅
                  </motion.div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Thanks for reaching out, <strong style={{ color: 'var(--text-primary)' }}>{formData.name || 'friend'}</strong>!<br />
                    I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-outline"
                    style={{ marginTop: '1.5rem', fontSize: '0.85rem', padding: '0.6rem 1.5rem' }}
                  >
                    Send Another Message
                  </button>
                </motion.div>

              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      Send a Message
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      I respond within 24 hours.
                      {!isEmailJSConfigured() && (
                        <span style={{ color: 'rgba(251,191,36,0.8)', marginLeft: '0.4rem' }}>
                          (Demo mode – configure EmailJS to enable sending)
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Name + Email row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}>
                    <Field label="Full Name" error={errors.name}>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        autoComplete="name"
                        disabled={isSending}
                        aria-required="true"
                        aria-invalid={Boolean(errors.name)}
                      />
                    </Field>

                    <Field label="Email Address" error={errors.email}>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        autoComplete="email"
                        disabled={isSending}
                        aria-required="true"
                        aria-invalid={Boolean(errors.email)}
                      />
                    </Field>
                  </div>

                  {/* Subject */}
                  <div style={{ marginBottom: '1rem' }}>
                    <Field label="Subject" error={errors.subject}>
                      <input
                        type="text"
                        name="subject"
                        id="contact-subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="AI/ML Collaboration / Internship Inquiry"
                        className={`form-input ${errors.subject ? 'error' : ''}`}
                        disabled={isSending}
                        aria-required="true"
                        aria-invalid={Boolean(errors.subject)}
                      />
                    </Field>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <Field label="Message" error={errors.message}>
                      <textarea
                        name="message"
                        id="contact-message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about the opportunity or what you'd like to discuss..."
                        rows={5}
                        className={`form-input ${errors.message ? 'error' : ''}`}
                        style={{ resize: 'vertical', minHeight: '120px' }}
                        disabled={isSending}
                        aria-required="true"
                        aria-invalid={Boolean(errors.message)}
                      />
                    </Field>
                  </div>

                  {/* Error banner */}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        background: 'rgba(220,38,38,0.1)',
                        border: '1px solid rgba(220,38,38,0.3)',
                        color: '#f87171',
                        fontSize: '0.83rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <span>❌</span>
                      Failed to send. Please email me directly at{' '}
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        style={{ color: '#f87171', fontWeight: '700', textDecoration: 'underline' }}
                      >
                        {CONTACT_INFO.email}
                      </a>
                    </motion.div>
                  )}

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '0.9rem',
                      opacity: isSending ? 0.75 : 1,
                      cursor: isSending ? 'not-allowed' : 'pointer',
                    }}
                    whileHover={isSending ? {} : { scale: 1.02 }}
                    whileTap={isSending ? {} : { scale: 0.98 }}
                    disabled={isSending}
                    id="contact-submit-btn"
                    aria-busy={isSending}
                  >
                    {isSending ? (
                      <>
                        <svg
                          width="16" height="16"
                          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                          style={{ animation: 'spin-slow 1s linear infinite' }}
                          aria-hidden="true"
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
