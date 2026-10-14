import React from 'react';

export default function HomePage() {
  return (
    <section 
      className="tec-homepage-fullwidth-hero"
      style={{
        width: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        lineHeight: 0,
        backgroundColor: '#0a1633'
      }}
    >
      <img
        src="/campus_panorama.png"
        alt="Tirumala Engineering College Campus Panorama"
        style={{
          width: '100%',
          height: 'calc(100vh - 96px)',
          minHeight: '480px',
          maxHeight: '900px',
          objectFit: 'cover',
          objectPosition: 'center 45%',
          display: 'block',
          margin: 0,
          padding: 0,
          border: 'none'
        }}
      />
    </section>
  );
}
