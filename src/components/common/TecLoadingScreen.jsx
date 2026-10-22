import React, { useState, useEffect, useRef } from 'react';
import TecLogoMotion from './TecLogoMotion';

/**
 * TecLoadingScreen — Universal Brand Loading Experience for Tirumala Engineering College
 * 
 * Appears appropriately:
 * 1. When the website first opens in any tab.
 * 2. Whenever the user manually reloads the browser (F5 / Refresh).
 * 3. When directly opening or refreshing an internal page URL.
 * 
 * Lifecycle & Performance Rules:
 * - Reflects genuine initial application startup and document readiness.
 * - Does not block the user with an arbitrary long delay (smooth ~550ms display window).
 * - Immediately accessible if prefers-reduced-motion is active (~150ms).
 * - Failsafe auto-dismiss (4.5s) to guarantee the user is never stuck on network issues.
 * - Strict Mode safe: all timers and event listeners are cleanly unmounted.
 * - Accessible: status semantics, non-trapping focus, Escape-key dismiss.
 */
export default function TecLoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);
  const failsafeTimerRef = useRef(null);
  const isUnmountedRef = useRef(false);

  const dismiss = () => {
    if (isUnmountedRef.current) return;
    setFading(true);
    timerRef.current = setTimeout(() => {
      if (!isUnmountedRef.current) {
        setVisible(false);
        if (onComplete) onComplete();
      }
    }, 320);
  };

  useEffect(() => {
    isUnmountedRef.current = false;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const minDisplayMs = prefersReducedMotion ? 120 : 580;

    const handleReady = () => {
      timerRef.current = setTimeout(() => {
        dismiss();
      }, minDisplayMs);
    };

    if (document.readyState === 'complete') {
      handleReady();
    } else {
      window.addEventListener('load', handleReady, { once: true });
    }

    // Failsafe timer (4.5s maximum) to prevent getting permanently stuck
    failsafeTimerRef.current = setTimeout(() => {
      dismiss();
    }, 4500);

    // Escape key listener for instant bypass
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        dismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isUnmountedRef.current = true;
      window.removeEventListener('load', handleReady);
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (failsafeTimerRef.current) clearTimeout(failsafeTimerRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Tirumala Engineering College portal"
      id="tec-universal-loader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(circle at 50% 45%, #ffffff 0%, #f8fafc 70%, #edf2f7 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(1.015)' : 'scale(1)',
        transition: 'opacity 320ms cubic-bezier(0.16, 1, 0.3, 1), transform 320ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: fading ? 'none' : 'auto',
        userSelect: 'none',
        padding: '1.5rem'
      }}
    >
      {/* Brand Motion Stage */}
      <TecLogoMotion
        size={185}
        variant="hero"
        showCaption={true}
        captionText="Tirumala Engineering College"
        subCaption="Technology • Excellence • Commitment"
      />

      {/* Institutional Accreditation Pill */}
      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.35rem 0.85rem',
          backgroundColor: 'rgba(11, 37, 69, 0.04)',
          border: '1px solid rgba(11, 37, 69, 0.09)',
          borderRadius: '9999px',
          fontSize: '0.74rem',
          fontWeight: 600,
          color: '#475569',
          letterSpacing: '0.04em'
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#059669',
            boxShadow: '0 0 0 2px rgba(5, 150, 105, 0.2)'
          }}
        />
        <span>Autonomous • Approved by AICTE • NAAC &amp; NBA Accredited</span>
      </div>

      {/* Accessible Skip Button */}
      <button
        onClick={dismiss}
        type="button"
        style={{
          position: 'absolute',
          bottom: '2rem',
          background: 'none',
          border: 'none',
          color: '#94a3b8',
          fontSize: '0.78rem',
          fontWeight: 500,
          cursor: 'pointer',
          padding: '0.4rem 0.8rem',
          borderRadius: '4px',
          transition: 'color 0.2s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#0B2545')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
        aria-label="Skip loading animation"
      >
        Skip to website →
      </button>
    </div>
  );
}
