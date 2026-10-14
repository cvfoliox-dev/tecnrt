import React from 'react';

export default function HomePage() {
  return (
    <div
      style={{
        flex: 1,
        minHeight: '75vh',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        boxSizing: 'border-box'
      }}
    >
      <h1
        style={{
          color: '#FFFFFF',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
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
