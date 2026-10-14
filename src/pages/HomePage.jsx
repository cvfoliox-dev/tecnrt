import React from 'react';

export default function HomePage() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: '1.5rem',
        boxSizing: 'border-box',
        overflow: 'hidden',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
      }}
    >
      <h1
        style={{
          color: '#FFFFFF',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          margin: 0,
          padding: 0,
          textAlign: 'center',
          lineHeight: 1.1
        }}
      >
        COMING SOON
      </h1>
    </div>
  );
}
