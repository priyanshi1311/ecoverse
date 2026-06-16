// src/components/layout/Footer.jsx
import React from 'react';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      padding: '24px var(--spacing-xl)',
      background: 'transparent',
      borderTop: '1px solid var(--glass-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.85rem',
      color: 'var(--text-muted)',
      width: '100%',
      marginTop: 'auto'
    }}>
      <div>
        © 2026 EcoVerse Inc. Open source client application.
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span>Made with</span>
        <Heart size={12} style={{ color: 'var(--color-danger)', fill: 'var(--color-danger)' }} />
        <span>for a greener tomorrow.</span>
      </div>
    </footer>
  );
};

export default Footer;
