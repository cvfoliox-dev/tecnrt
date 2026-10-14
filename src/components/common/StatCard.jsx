import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'primary', badgeText, badgeType = 'success' }) {
  const getColorStyles = () => {
    switch (color) {
      case 'accent':
        return {
          iconBg: 'rgba(245, 158, 11, 0.12)',
          iconColor: '#d97706',
          borderLeft: '4px solid #f59e0b'
        };
      case 'success':
        return {
          iconBg: 'rgba(16, 185, 129, 0.12)',
          iconColor: '#059669',
          borderLeft: '4px solid #10b981'
        };
      case 'danger':
        return {
          iconBg: 'rgba(239, 68, 68, 0.12)',
          iconColor: '#dc2626',
          borderLeft: '4px solid #ef4444'
        };
      case 'purple':
        return {
          iconBg: 'rgba(147, 51, 234, 0.12)',
          iconColor: '#7e22ce',
          borderLeft: '4px solid #a855f7'
        };
      case 'primary':
      default:
        return {
          iconBg: 'rgba(37, 99, 235, 0.12)',
          iconColor: '#2563eb',
          borderLeft: '4px solid #2563eb'
        };
    }
  };

  const style = getColorStyles();

  return (
    <div className="card" style={{ borderLeft: style.borderLeft, padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {title}
          </span>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginTop: '0.2rem' }}>
            {value}
          </div>
        </div>

        {Icon && (
          <div style={{ 
            width: '44px', 
            height: '44px', 
            borderRadius: '12px', 
            background: style.iconBg, 
            color: style.iconColor, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Icon size={22} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
        {subtitle && (
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
            {subtitle}
          </span>
        )}
        {badgeText && (
          <span className={`badge badge-${badgeType}`} style={{ fontSize: '0.7rem' }}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
