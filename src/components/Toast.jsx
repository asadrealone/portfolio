import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Toast – lightweight notification component.
 * Props:
 *   message  : string  – text to display
 *   type     : 'success' | 'error' | 'info'
 *   show     : boolean – controlled visibility
 *   onClose  : fn      – called after auto-dismiss
 *   duration : number  – ms before auto-dismiss (default 3000)
 */
export default function Toast({ message, type = 'success', show, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [show, duration, onClose]);

  const STYLES = {
    success: {
      bg: 'rgba(22, 163, 74, 0.15)',
      border: 'rgba(22, 163, 74, 0.35)',
      icon: '✅',
      color: '#4ade80',
    },
    error: {
      bg: 'rgba(220, 38, 38, 0.15)',
      border: 'rgba(220, 38, 38, 0.35)',
      icon: '❌',
      color: '#f87171',
    },
    info: {
      bg: 'rgba(37, 99, 235, 0.15)',
      border: 'rgba(37, 99, 235, 0.35)',
      icon: 'ℹ️',
      color: 'var(--neon-blue)',
    },
  };

  const s = STYLES[type] || STYLES.info;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          role="alert"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.875rem 1.5rem',
            borderRadius: '14px',
            border: `1px solid ${s.border}`,
            background: s.bg,
            backdropFilter: 'blur(16px)',
            boxShadow: `0 8px 32px ${s.border}`,
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            fontWeight: '600',
            zIndex: 9999,
            whiteSpace: 'nowrap',
            maxWidth: 'calc(100vw - 3rem)',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>{s.icon}</span>
          <span>{message}</span>
          <button
            onClick={onClose}
            aria-label="Dismiss notification"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              marginLeft: '0.25rem',
              fontSize: '1rem',
              lineHeight: 1,
              padding: '0.1rem',
            }}
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
